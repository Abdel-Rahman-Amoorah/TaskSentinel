📱 React Native + Flask Logging App with Splunk Integration

This is a full-stack mobile application built using **React Native (Expo)** for the frontend and **Python Flask** for the backend. It features user authentication and CRUD operations, all of which are logged and forwarded to **Splunk** using the **HTTP Event Collector (HEC)** for real-time monitoring and dashboarding.

------------------------------------------------------------

📁 Project Structure

project/
├── backend/         # Flask API and data storage
│   ├── app.py
│   ├── auth.json
│   ├── crud.json
├── frontend/        # Expo React Native app
│   ├── App.js
│   └── ...
├── .gitattributes
├── .gitignore
├── LICENSE
└── README.md

------------------------------------------------------------

✨ Features

Frontend (React Native):
- 📲 User registration & login
- ✅ Create, Read, Update, Delete (CRUD) tasks
- 📱 Captures device info using Expo APIs
- 📡 Sends activity logs to the backend

Backend (Flask):
- 🧠 Simple REST API for auth and task management
- 🗂 Data stored in auth.json and crud.json
- 🔐 CORS enabled for mobile access
- 📤 Sends structured logs to Splunk HEC

Splunk Integration:
- Real-time event tracking
- Supports custom dashboards & alerts
- Monitors app usage, failed logins, device stats

------------------------------------------------------------

🚀 Getting Started

Backend Setup

1. Navigate to the backend directory:
   cd backend

2. Install dependencies:
   pip install flask flask-cors requests

3. Run the Flask server:
   python app.py

> Ensure the backend is running on your local IP (0.0.0.0) and port 5000.

Frontend Setup

1. Navigate to the frontend directory:
   cd frontend

2. Install dependencies:
   npm install

3. Start the Expo development server:
   npx expo start

4. To build the Android app:
   eas build --platform android

> Update the API base URL in the app to match your local IP (e.g., http://192.168.1.197:5000).

------------------------------------------------------------

🧠 Using Splunk with HEC

1. Create a HTTP Event Collector token in Splunk.
2. Add your token and Splunk URL in backend/app.py:
   HEC_URL = "https://<your-ip>:8088/services/collector"
   HEC_TOKEN = "<your-token>"
3. Logs will automatically be sent from the backend to Splunk when the app is used.

------------------------------------------------------------

📊 Example Splunk Searches

Exclude empty usernames:
index=main sourcetype=_json | where username!=""

Count actions:
index=main sourcetype=_json | stats count by operation

Device usage:
index=main sourcetype=_json | spath input=device.modelName | stats count by device.modelName

------------------------------------------------------------

🔐 Security Considerations

- Use HTTPS and valid SSL certificates in production.
- Secure your Splunk HEC token and rotate it regularly.
- Consider moving from .json to a database for better scalability.

------------------------------------------------------------

📄 License

This project is licensed under the MIT License.

------------------------------------------------------------

🙋‍♂️ Questions or Feedback?

Feel free to open an issue or contribute to the project!