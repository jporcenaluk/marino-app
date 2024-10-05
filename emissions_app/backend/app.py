# backend/app.py
import os
from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/data')
def hello():
    return jsonify({"message": "Hello from the Flask a d 2!"})