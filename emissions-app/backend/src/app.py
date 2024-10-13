# backend/app.py
import os
from dataclasses import asdict
import datetime as dt
from datetime import timezone

# third parties
import requests
from flask import Flask, request, jsonify, send_from_directory
from google.cloud import firestore

# local
from models.daily_individual_response import (
    DailyIndividualResponse,
    DailyIndividualResponseBase,
)
from stats.daily_individual import DailyIndividual
from stats.summaries import DailySummary, WeeklySummary
from recaptcha.recaptcha import recaptcha_secret

STATIC_FOLDER = os.environ.get("STATIC_FOLDER", "static")
FLASK_ENV = os.environ.get("FLASK_ENV", "prod")
GCP_PROJECT = "marino-emissions-app"
app = Flask(__name__, static_folder=STATIC_FOLDER, static_url_path="")

db = firestore.Client(project=GCP_PROJECT, database="marino-emissions-app")
RECAPTCHA_SECRET_KEY = recaptcha_secret(GCP_PROJECT)


# Serve React App
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react_app(path):
    if path != "" and path.startswith("api"):
        # If it's an API route, return 404
        return "API not found", 404
    return send_from_directory(app.static_folder, "index.html")


@app.route("/api/transport", methods=["POST"])
def transport():
    """
    Retrieves the transport data to be summarised
    """
    try:
        print("Received request")
        data: dict = request.get_json()

        recaptcha_token = data.get("captcha")
        if not recaptcha_token:
            return jsonify({"error": "Missing reCAPTCHA token"}), 400

        # Verify reCAPTCHA token
        recaptcha_response = requests.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data={"secret": RECAPTCHA_SECRET_KEY, "response": recaptcha_token},
            timeout=10,
        )

        result: dict = recaptcha_response.json()

        # Verify the success and the score returned
        min_score = 0.4
        if not result.get("success"):
            return jsonify({"error": "Invalid reCAPTCHA. Please try again."}), 400
        if result.get("score", 0) < min_score:
            return jsonify({"error": "You are a bot, I am pretty sure"}), 400

        # Extract the required fields from the JSON payload
        user_id = data.get("user_id")
        distance_km = data.get("distance_km")
        tz_identifier = data.get("tz_identifier")
        transport_mode = data.get("transport_mode")

        # Generate file info
        now_utc = dt.datetime.now(tz=timezone.utc)
        date_str = now_utc.strftime("%Y%m%d")
        document_id = f"{date_str}__{user_id}"

        # Write to Firestore
        doc_ref = db.collection("daily_transport").document(
            document_id
        )  # Creates a new document

        daily_transport = DailyIndividualResponse(
            created_utc=now_utc,
            distance_km=distance_km,
            user_id=user_id,
            email="",
            ip_address="",
            transport_mode=transport_mode,
            tz_identifier=tz_identifier,
        )

        doc_ref.set(asdict(daily_transport))
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error", "exception": e}), 500


@app.route("/api/visualisation", methods=["GET"])
def visualisation():
    try:
        one_week_ago = dt.datetime.now(tz=timezone.utc) - dt.timedelta(days=7)
        doc_ref = (
            db.collection("daily_transport")
            .where("created_utc", ">=", one_week_ago)
            .stream()
        )
        daily_individual_responses = [
            DailyIndividualResponseBase(
                created_utc=response.get("created_utc"),
                distance_km=response.get("distance_km"),
                transport_mode=response.get("transport_mode"),
            )
            for response in list(doc_ref)
        ]
        daily_individual_summaries = [
            DailyIndividual(response) for response in daily_individual_responses
        ]
        grouped_by_day = {}
        for summary in daily_individual_summaries:
            date = summary.created_utc.date()
            if date not in grouped_by_day:
                grouped_by_day[date] = []
            grouped_by_day[date].append(summary)
        daily_summaries = [
            DailySummary(date=summary, individual_emissions=emissions)
            for summary, emissions in grouped_by_day.items()
        ]
        weekly_summary = WeeklySummary(daily_summaries=daily_individual_summaries)
        return (
            jsonify(
                {
                    "daily": [asdict(summary) for summary in daily_summaries],
                    "weekly": asdict(weekly_summary),
                }
            ),
            200,
        )
    except Exception as e:
        return jsonify({"error": e}), 500


if __name__ == "__main__":
    # port is set in GCP; otherwise use 8080
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
