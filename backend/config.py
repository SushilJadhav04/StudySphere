import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()  # Load environment variables from .env file

class Config:
    # Use environment variables for keys and secrets
    API_KEY = os.environ.get("API_KEY", "default_api_key")  # If missing, use a fallback key
    WINSTON_AI_KEY = os.environ.get("WINSTON_AI_KEY", "fallback_winston_key")  # Use env var or fallback
    GOOGLE_BOOKS_API_KEY = os.environ.get("GOOGLE_BOOKS_API_KEY", "default_google_books_key")
    GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "default_google_client_id")
    GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", "default_google_client_secret")
    GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"
    OAUTHLIB_INSECURE_TRANSPORT = "1"  # Set to "1" to disable SSL requirement for local testing
    
    # Secret and session keys
    SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")  # Ensure you have this in your .env
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback_key_if_missing")
    
    # Session configuration
    SESSION_COOKIE_NAME = "session"
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_SAMESITE = "None"
    SESSION_COOKIE_HTTPONLY = True
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)
    SESSION_PERMANENT = True
    SESSION_TYPE = "filesystem"

config = Config()