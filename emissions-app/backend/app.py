# backend/app.py
import os
import requests
from flask import Flask, request, jsonify, send_from_directory
from dataclasses import dataclass, asdict
import datetime as dt
from datetime import timezone
from google.cloud import firestore, secretmanager_v1

STATIC_FOLDER = os.environ.get("STATIC_FOLDER", "static")
app = Flask(__name__, static_folder=STATIC_FOLDER, static_url_path='')

db = firestore.Client(project="marino-emissions-app", database="marino-emissions-app")
RECAPTCHA_SECRET_KEY = secretmanager_v1.SecretManagerServiceAsyncClient().get_secret("projects/399159252007/secrets/marino-emissions-app-recaptcha")

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    # If the path is empty or does not exist, serve index.html
    if path == "" or not os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, 'index.html')
    # Otherwise, serve the requested file
    return send_from_directory(app.static_folder, path)

@app.route('/api/data')
def hello():
    return jsonify({"message": "Marino Maths Week"})

@app.route('/api/transport', methods=["POST"])
def transport():
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
        if not result.get('success') or result.get('score', 0) < 0.5:
            return jsonify({'error': 'Invalid reCAPTCHA. Please try again.'}), 400



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

        @dataclass
        class DailyTransport:
            created_utc: dt.datetime
            distance: int
            email: str
            ip_address: str
            transport_mode: str
            user_id: str
            tz_identifier: str = "Eire"

        daily_transport = DailyTransport(
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
    
if __name__ == "__main__":
    # port is set in GCP; otherwise use 8080
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)