import json
import os
from datetime import datetime

import splunk
from flask import Flask, jsonify, request  # type: ignore
from flask_cors import CORS  # type: ignore
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes

crud_file_path = os.path.join("backend", "crud.json")


@app.route('/create', methods=['POST'])
def create():
    data = request.get_json()
    if not data or 'user' not in data or 'operation' not in data or 'comment' not in data:
        return jsonify({'error': 'Username, operation, and comment are required'}), 400
    

    log_entry = {
        "operation": data['operation'],
        "timestamp": datetime.now().isoformat(),
        "username": data['user'],
        "comment": data['comment'],
        "device": data.get('_device', {}),
        "method": request.method,
    }

    os.makedirs("backend", exist_ok=True)

    if os.path.exists(crud_file_path):
        try:
            with open(crud_file_path, 'r') as f:
                existing_data = json.load(f)
        except json.JSONDecodeError:
            existing_data = []
    else:
        existing_data = []

    existing_data.append(log_entry)

    with open(crud_file_path, 'w') as f:
        json.dump(existing_data, f, indent=4)

    # --- Send log entry to Splunk ---
    splunk.send_event_to_splunk(log_entry)

    return jsonify({'message': 'Operation data stored successfully'}), 200

@app.route('/read', methods=['POST'])
def read():
    data = request.get_json()
    if not data or 'user' not in data or 'operation' not in data or 'comment' not in data:
        return jsonify({'error': 'Username, operation, and comment are required'}), 400
    

    log_entry = {
        "operation": data['operation'],
        "timestamp": datetime.now().isoformat(),
        "username": data['user'],
        "comment": data['comment'],
        "device": data.get('_device', {}),
        "method": request.method,
    }

    os.makedirs("backend", exist_ok=True)

    if os.path.exists(crud_file_path):
        try:
            with open(crud_file_path, 'r') as f:
                existing_data = json.load(f)
        except json.JSONDecodeError:
            existing_data = []
    else:
        existing_data = []

    existing_data.append(log_entry)

    with open(crud_file_path, 'w') as f:
        json.dump(existing_data, f, indent=4)

    # --- Send log entry to Splunk ---
    splunk.send_event_to_splunk(log_entry)

    return jsonify({'message': 'Operation data stored successfully'}), 200

@app.route('/update', methods=['PUT'])
def update():
    data = request.get_json()

    if not data or 'user' not in data or 'operation' not in data or 'comment' not in data:
        return jsonify({'error': 'Username, operation, and comment are required'}), 400
    

    log_entry = {
        "operation": data['operation'],
        "timestamp": datetime.now().isoformat(),
        "username": data['user'],
        "comment": data['comment'],
        "device": data.get('_device', {}),
        "method": request.method,
    }

    os.makedirs("backend", exist_ok=True)

    if os.path.exists(crud_file_path):
        try:
            with open(crud_file_path, 'r') as f:
                existing_data = json.load(f)
        except json.JSONDecodeError:
            existing_data = []
    else:
        existing_data = []

    existing_data.append(log_entry)
    
    with open(crud_file_path, 'w') as f:
        json.dump(existing_data, f, indent=4)

    # --- Send log entry to Splunk ---
    splunk.send_event_to_splunk(log_entry)

    return jsonify({'message': 'Operation data stored successfully'}), 200

@app.route('/delete', methods=['DELETE'])
def delete():
    data = request.get_json()

    if not data or 'user' not in data or 'operation' not in data or 'comment' not in data:
        return jsonify({'error': 'Username, operation, and comment are required'}), 400
    

    log_entry = {
        "operation": data['operation'],
        "timestamp": datetime.now().isoformat(),
        "username": data['user'],
        "comment": data['comment'],
        "device": data.get('_device', {}),
        "method": request.method,
    }

    os.makedirs("backend", exist_ok=True)

    if os.path.exists(crud_file_path):
        try:
            with open(crud_file_path, 'r') as f:
                existing_data = json.load(f)
        except json.JSONDecodeError:
            existing_data = []
    else:
        existing_data = []

    existing_data.append(log_entry)
    
    with open(crud_file_path, 'w') as f:
        json.dump(existing_data, f, indent=4)
    
    # --- Send log entry to Splunk ---
    splunk.send_event_to_splunk(log_entry)

    return jsonify({'message': 'Operation data stored successfully'}), 200