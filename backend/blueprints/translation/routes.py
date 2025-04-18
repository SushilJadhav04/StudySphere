from flask import Blueprint, request, jsonify, render_template
from flask_cors import CORS
from deep_translator import GoogleTranslator

# Initialize Blueprint
translation_bp = Blueprint('translation', __name__, template_folder='templates', static_folder='static')

# Enable CORS for this blueprint
CORS(translation_bp)

# Cache to store previous translations (optimization)
translation_cache = {}

@translation_bp.route("/", methods=["GET"])
def translation_ui():
    """ Render translation UI """
    return render_template("translation.html")

@translation_bp.route("/translate", methods=["POST"])
def translate():
    """ Handle translation requests """
    data = request.get_json()

    # Debugging: Check if Flask receives the request
    print("Received Data from Frontend:", data)

    if not data:
        return jsonify({"error": "No JSON data received"}), 400

    text = data.get("text")
    source_lang = data.get("source_lang", "auto")  # Default: auto-detect
    target_lang = data.get("target_lang")  # Ensure this matches your frontend

    if not text:
        return jsonify({"error": "No text provided"}), 400
    if not target_lang:
        return jsonify({"error": "No target language provided"}), 400

    # Debugging: Check if text is reaching translation logic
    print(f"Translating '{text}' from '{source_lang}' to '{target_lang}'...")

    try:
        translated_text = GoogleTranslator(source=source_lang, target=target_lang).translate(text)

        # Debugging: Confirm translation
        print("Translation Result:", translated_text)

        return jsonify({"translated_text": translated_text})

    except Exception as e:
        print("Translation Error:", str(e))  # Debugging
        return jsonify({"error": "Translation failed", "details": str(e)}), 500
