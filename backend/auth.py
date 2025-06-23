import json
import os
from datetime import datetime

import splunk
from flask import Flask, jsonify, request  # type: ignore
from flask_cors import CORS  # type: ignore

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes
auth_file_path = os.path.join("backend", "auth.json")
cred_file_path = os.path.join("backend", "cred.json")

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Username and password are required'}), 400

    log_entry = {
        "action": "login",
        "timestamp": datetime.now().isoformat(),
        "username": data['username'],
        "password": data['password'],
        "device": data.get('_device', {}),
    }

    # Create backend directory if it doesn't exist
    os.makedirs("backend", exist_ok=True)

    # --- Check if credentials exist in cred.json ---
    if os.path.exists(cred_file_path):
        try:
            with open(cred_file_path, 'r') as f:
                creds = json.load(f)
        except json.JSONDecodeError:
            creds = []
    else:
        creds = []

    # Check if username/password match in cred.json
    user_exists = any(
        user.get('username') == data['username'] and user.get('password') == data['password']
        for user in creds
    )

    # Add result to log entry
    log_entry['login_result'] = 'success' if user_exists else 'failure'

    # --- Save log entry in auth.json ---
    if os.path.exists(auth_file_path):
        try:
            with open(auth_file_path, 'r') as f:
                existing_logs = json.load(f)
        except json.JSONDecodeError:
            existing_logs = []
    else:
        existing_logs = []

    existing_logs.append(log_entry)

    with open(auth_file_path, 'w') as f:
        json.dump(existing_logs, f, indent=4)

    # --- Send log entry to Splunk ---
    splunk.send_event_to_splunk(log_entry)
    # Return response
    if user_exists:
        return jsonify({'message': 'Login successful'}), 200 # OK
    else:
        return jsonify({'message': 'Login failed'}),401 # Unauthorized


@app.route('/logout', methods=['POST'])
def logout():
    data = request.get_json()
    if not data or 'currentUser' not in data:
        return jsonify({'error': 'Current User is required'}), 400
    
    log_entry = {
        "action": "logout",
        "timestamp": datetime.now().isoformat(),
        "currentUser": data['currentUser'],
        "device": data.get('_device', {}),
    }
    # Ensure file and folder exist
    os.makedirs("backend", exist_ok=True)

    if os.path.exists(auth_file_path):
        try:
            with open(auth_file_path, 'r') as f:
                existing_data = json.load(f)
        except json.JSONDecodeError:
            existing_data = []
    else:
        existing_data = []

    existing_data.append(log_entry)

    with open(auth_file_path, 'w') as f:
        json.dump(existing_data, f, indent=4)

    # --- Send log entry to Splunk ---
    splunk.send_event_to_splunk(log_entry)

    return jsonify({'message': 'Logout data stored successfully'}), 200

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data or 'email' not in data:
        return jsonify({'error': 'Username, password and email are required'}), 400

    # Log the attempt
    log_entry = {
        "action": "register",
        "timestamp": datetime.now().isoformat(),
        "username": data['username'],
        "password": data['password'],
        "email": data['email'],
        "device": data.get('_device', {}),
    }

    os.makedirs("backend", exist_ok=True)

    # Save log to auth.json
    if os.path.exists(auth_file_path):
        try:
            with open(auth_file_path, 'r') as f:
                auth_logs = json.load(f)
        except json.JSONDecodeError:
            auth_logs = []
    else:
        auth_logs = []

    auth_logs.append(log_entry)

    with open(auth_file_path, 'w') as f:
        json.dump(auth_logs, f, indent=4)

    # Save credentials to cred.json
    if os.path.exists(cred_file_path):
        try:
            with open(cred_file_path, 'r') as f:
                creds = json.load(f)
        except json.JSONDecodeError:
            creds = []
    else:
        creds = []

    # Prevent duplicate registration
    if any(u['username'] == data['username'] for u in creds):
        return jsonify({'error': 'Username already exists'}), 409

    cred_data = {
        "username": data['username'],
        "password": data['password'],
        "email": data['email']
    }
    creds.append(cred_data)

    with open(cred_file_path, 'w') as f:
        json.dump(creds, f, indent=4)

    # --- Send log entry to Splunk ---
    splunk.send_event_to_splunk(log_entry)

    return jsonify({'message': 'Register data stored successfully'}), 200