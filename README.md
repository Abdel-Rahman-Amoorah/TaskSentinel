# 📱 React Native + Flask Logging App with Splunk Integration

A full-stack mobile application with React Native (Expo) frontend and Flask backend, featuring user authentication, CRUD operations, and real-time logging to Splunk via HTTP Event Collector (HEC).

## 📁 Project Structure

```
project/
├── backend/         # Flask API and data storage
│   ├── manage.py       # Flask server and Splunk integration
│   ├── auth.json    # User authentication data
│   ├── crud.json    # Task data storage
├── frontend/        # Expo React Native app
│   ├── app/
│   │   ├── index.tsx    
│   │   └── api.tsx           # Additional frontend files   # Main application logic
│   │   └── ...               # Additional frontend files
│   
├── .gitattributes
├── .gitignore
├── LICENSE
└── README.md
```

## ✨ Features

### Frontend (React Native)
- 📲 User registration and login
- ✅ Create, Read, Update, Delete (CRUD) tasks
- 📱 Captures device information using Expo APIs
- 📡 Sends activity logs to Splunk

### Backend (Flask)
- 🧠 REST API for authentication and task management
- 🗂 Data stored in JSON files (auth.json and crud.json)
- 🔐 CORS enabled for mobile access
- 📤 Forwards structured logs to Splunk HEC

### Splunk Integration
- Real-time event tracking
- Custom dashboards and alerts support
- Monitors app usage, failed logins, and device stats

## 🚀 Getting Started

### Backend Setup
1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install flask flask-cors requests
```

3. Run Flask server:
```bash
python app.py
```

> Ensure backend runs on your local IP (e.g., `http://localhost:8080`)

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start Expo server:
```bash
npx expo start
```

4. Build Android app:
```bash
eas build --platform android
```

> Update API base URL in app to match your local IP

## 🧠 Splunk HEC Configuration

1. Create HEC token in Splunk
2. Configure in `backend/app.py`:
```python
HEC_URL = "https://<your-splunk-ip>:8088/services/collector"
HEC_TOKEN = "<your-token>"
```

## 📊 Sample Splunk Queries

```
host="Your local Ip address" | where username!=""
host="Your local Ip address" | stats count by operation
host="Your local Ip address" | spath input=device.modelName | stats count by device.modelName
```

## 🔐 Security Notes

- Use HTTPS in production
- Secure and rotate HEC tokens regularly
- Consider database over JSON files for scaling

## 📄 License

MIT License - See [LICENSE](LICENSE) file