from flask import Flask, render_template , request, jsonify ,session
from flask_cors import CORS
from config import Config , config
from flask_session import Session 
from flask_jwt_extended import JWTManager
import traceback
from datetime import timedelta
import os

from blueprints.chatbot.routes import chatbot_bp
from blueprints.book_repo.routes import book_repo_bp
from blueprints.studysparks.routes import studysparks_bp
from blueprints.translation.routes import translation_bp
from blueprints.summarization.routes import summarization_bp
from blueprints.youtube_summarizer.routes import youtube_bp
from blueprints.login.google_auth import google_auth_bp
from blueprints.contact.routes import contact_bp

# ✅ Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)
app.config["JWT_SECRET_KEY"] = "886ad62177ec92ed7178f46247cafbdb1a950ca0fb905fae8df6f2ba0fd809dd"  
app.config["SECRET_KEY"] = "ddb2b610b7bb1c0b4aedc2e0e4c4466aa57e41447e7fbfb52affd72362fe742d"
jwt = JWTManager(app)
Session(app)

# ✅ Set up CORS with proper configuration
CORS(app, 
    supports_credentials=True, 
    origins=["http://localhost:5173", "http://192.168.76.110:5173", "*"],  # Allow both PC & Mobile
    allow_headers=["Content-Type", "Authorization"],
    resources={r"/*": {"origins": "*"}}
)
 

# ✅ Allow Preflight Requests (OPTIONS)
@app.before_request
def handle_options():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight allowed"}), 200


# ✅ Error Handling
def internal_server_error(e):
    print("Internal Server Error:", str(e))
    print(traceback.format_exc())  # Print full error details
    return jsonify({"error": "Internal Server Error"}), 500


# ✅ Register blueprints
app.register_blueprint(chatbot_bp, url_prefix="/chatbot")
app.register_blueprint(book_repo_bp, url_prefix="/book_repo")
app.register_blueprint(studysparks_bp, url_prefix="/studysparks")
app.register_blueprint(translation_bp, url_prefix="/translation")
app.register_blueprint(summarization_bp, url_prefix="/summarization")
app.register_blueprint(youtube_bp, url_prefix="/youtube")
app.register_blueprint(google_auth_bp, url_prefix="/auth")
app.register_blueprint(contact_bp)
# ✅ Serve main index
@app.route("/")
def index():
    return jsonify({"message": "StudySphere backend is live!"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)

