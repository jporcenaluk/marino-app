# backend/app.py
import os
import requests
from flask import Flask, request, jsonify, send_from_directory
from dataclasses import dataclass, asdict
import datetime as dt
from datetime import timezone
from google.cloud import firestore
from models.daily_individual_response import DailyIndividualResponse, DailyIndividualResponseBase
from stats.total_summary import Summary
from stats.daily_individual import Individual
from recaptcha.recaptcha import recaptcha_secret

STATIC_FOLDER = os.environ.get("STATIC_FOLDER", "static")
FLASK_ENV = os.environ.get("FLASK_ENV", "prod")
GCP_PROJECT = "marino-emissions-app"
app = Flask(__name__, static_folder=STATIC_FOLDER, static_url_path='')

db = firestore.Client(project=GCP_PROJECT, database="marino-emissions-app")
RECAPTCHA_SECRET_KEY = recaptcha_secret(GCP_PROJECT)

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path != "" and path.startswith('api'):
        # If it's an API route, return 404
        return "API not found", 404
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/transport', methods=["POST"])
def transport():
    """
    Retrieves the transport data to be summarised
    """
    try:
        data: dict = request.get_json()
       
        recaptcha_token = data.get('captcha')
        if not recaptcha_token:
            return jsonify({'error': 'Missing reCAPTCHA token'}), 400

        # Verify reCAPTCHA token
        recaptcha_response = requests.post(
            'https://www.google.com/recaptcha/api/siteverify',
            data={
                'secret': RECAPTCHA_SECRET_KEY,
                'response': recaptcha_token
            }
        )

        result: dict = recaptcha_response.json()

        # Verify the success and the score returned
        min_score = 0.4
        if not result.get('success'):
            return jsonify({'error': 'Invalid reCAPTCHA. Please try again.'}), 400
        if result.get('score', 0) < min_score:
            return jsonify({'error': 'You are a bot, I am pretty sure'}), 400
        
        # Extract the required fields from the JSON payload
        user_id = data.get('user_id')
        distance = data.get('distance')
        tz_identifier = data.get('tz_identifier')
        transport_mode = data.get('transport_mode')

        # Generate file info
        now_utc = dt.datetime.now(tz=timezone.utc)
        date_str = now_utc.strftime("%Y%m%d")
        document_id = f"{date_str}__{user_id}"

        # Write to Firestore
        doc_ref = db.collection('daily_transport').document(document_id)  # Creates a new document

        daily_transport = DailyIndividualResponse(
            created_utc=now_utc,
            distance=distance,
            user_id=user_id,
            email="",
            ip_address="",
            transport_mode=transport_mode,
            tz_identifier=tz_identifier
        )

        doc_ref.set(asdict(daily_transport))
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error"}), 500


@app.route('/api/visualisation', methods=["GET"])
def visualisation():
    try:
        doc_ref = db.collection('daily_transport').stream()
        docs = [DailyIndividualResponseBase(
            created_utc=doc.get("created_utc"),
            distance_km=doc.get("distance"),
            transport_mode=doc.get("transport_mode"),
            tz_identifier=doc.get("tz_identifier")
        ) for doc in list(doc_ref)]
        
        return jsonify(docs), 200
    except Exception as e:
        return jsonify({'error': e}), 500

if __name__ == "__main__":
    # port is set in GCP; otherwise use 8080
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)