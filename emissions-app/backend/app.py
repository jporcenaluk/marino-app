# backend/app.py
import os
from flask import Flask, jsonify, send_from_directory

STATIC_FOLDER = os.environ.get("STATIC_FOLDER", "static")
app = Flask(__name__, static_folder=STATIC_FOLDER, static_url_path='')

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
    return jsonify({"message": "Hi Sarah! It's not much but it's an app!"})

if __name__ == "__main__":
    # port is set in GCP; otherwise use 8080
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)