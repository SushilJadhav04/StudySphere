import os
import json
import requests
from flask import redirect, request, session, url_for, jsonify
from . import google_auth_bp
from google_auth_oauthlib.flow import Flow
from urllib.parse import urlencode
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

# Allow http (for local development only)
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID") 
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"
REDIRECT_URI = "https://studysphere-dijr.onrender.com/auth/callback"


JWT_SECRET = os.getenv("JWT_SECRET_KEY")

def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()

@google_auth_bp.route("/google-login")
def google_login():
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [REDIRECT_URI],
            }
        },
        scopes=[
            "openid",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ]
    )
    flow.redirect_uri = REDIRECT_URI  # ✅ Required for local testing

    authorization_url, state = flow.authorization_url(
        access_type='offline',            # optional, for refresh tokens
        include_granted_scopes='true'     # optional, lets user avoid re-consent
    )
    session["state"] = state
    return redirect(authorization_url)

@google_auth_bp.route("/callback")
def callback():
    state = session.get("state")
    if not state:
        return "Session state missing", 400

    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [REDIRECT_URI],
            }
        },
        scopes=[
            "openid",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ],
        state=state,
    )
    flow.redirect_uri = REDIRECT_URI

    try:
        flow.fetch_token(authorization_response=request.url)
    except Exception as e:
        return f"Token fetch failed: {str(e)}", 400

    credentials = flow.credentials
    userinfo_response = requests.get(
        get_google_provider_cfg()["userinfo_endpoint"],
        headers={"Authorization": f"Bearer {credentials.token}"}
    )
    user_info = userinfo_response.json()
    # Generate JWT
    payload = {
        "email": user_info.get("email"),
        "name": user_info.get("name"),
        "exp": datetime.utcnow() + timedelta(hours=1)
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")

    # Redirect to frontend with token
    frontend_url = f"https://study-sphere-sepia-eta.vercel.app/?token={token}"
    return redirect(frontend_url)
    


@google_auth_bp.route("/verify-token", methods=["POST"])
def verify_token():
    data = request.get_json()
    token = data.get("token")
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        print("Decoded JWT in /verify-token:", decoded)  # This will appear in your server console/log
        return jsonify({
            "valid": True,
            "name": decoded.get("name"),
            "email": decoded.get("email")
        })
    except jwt.ExpiredSignatureError:
        print("Token expired error")
        return jsonify({"valid": False, "error": "Token expired"}), 401
    except jwt.InvalidTokenError:
        print("Invalid token error")
        return jsonify({"valid": False, "error": "Invalid token"}), 401

        

@google_auth_bp.route("/current_user", methods=["GET"])
def current_user():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"message": "Missing token"}), 400

    try:
        # Extract the JWT token from the Authorization header
        token = token.split(" ")[1]
        decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return jsonify({
            "name": decoded.get("name"),
            "email": decoded.get("email")
        })
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401