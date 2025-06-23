from auth import login, logout, register
from crud import create, delete, read, update
from flask import Flask  # type: ignore
from flask_cors import CORS  # type: ignore

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes

def manage():
    app.add_url_rule('/create', view_func=create, methods=['POST'])
    app.add_url_rule('/read', view_func=read, methods=['POST'])
    app.add_url_rule('/update', view_func=update, methods=['PUT'])
    app.add_url_rule('/delete', view_func=delete, methods=['DELETE']) 
    app.add_url_rule('/login', view_func=login, methods=['POST'])
    app.add_url_rule('/logout', view_func=logout, methods=['POST'])
    app.add_url_rule('/register', view_func=register, methods=['POST'])


if __name__ == '__main__':
    manage()
    app.run(host="192.168.1.197", port=8080)
