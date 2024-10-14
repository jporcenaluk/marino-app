import pytest
import datetime as dt
from unittest.mock import patch, MagicMock
from flask import Flask
from src.app import app

# emissions-app/backend/src/test_app.py

@pytest.fixture(autouse=True)
def client():
    with app.test_client() as client:
        yield client

@pytest.fixture(autouse=True)
def mock_firestore_client():
    with patch("src.app.firestore.Client") as mock_firestore_client:
        # return docs from .stream() method
        mock_firestore_client.return_value.collection.return_value.where.return_value.stream.return_value = [
            {
                "created_utc": dt.datetime(2021, 1, 1),
                "distance_km": 5,
                "transport_mode": "bike"
            },
            {
                "created_utc": dt.datetime(2021, 1, 1),
                "distance_km": 5,
                "transport_mode": "bike"
            }
        ]
        yield mock_firestore_client

@pytest.fixture(autouse=True)
def mock_requests_post():
    with patch("src.app.requests.post") as mock_requests_post:
        mock_requests_post.return_value.json.return_value = {"success": True, "score": 0.9}
        yield mock_requests_post


def test_transport_success(client):
    response = client.post("/api/transport", json={
        "user_id": "test_user",
        "distance_km": 5,
        "tz_identifier": "America/New_York",
        "transport_mode": "bike",
        "captcha": "test_captcha"
    })

    assert response.status_code == 200
    assert response.json == {"status": "success"}

def test_transport_invalid_recaptcha(mock_requests_post, client):
    mock_requests_post.return_value.json.return_value = {"success": False}

    response = client.post("/api/transport", json={
        "user_id": "test_user",
        "distance_km": 5,
        "tz_identifier": "America/New_York",
        "transport_mode": "bike",
        "captcha": "test_captcha"
    })

    assert response.status_code == 400
    assert response.json == {"error": "Invalid reCAPTCHA. Please try again."}

def test_visualisation_success(client):
    response = client.get("/api/01-story-summary")

    assert response.status_code == 200
    assert "daily" in response.json
    assert "weekly" in response.json