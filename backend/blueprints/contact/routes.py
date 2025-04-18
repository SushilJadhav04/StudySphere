from flask import Blueprint, request, jsonify
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask Blueprint for Contact Us
contact_bp = Blueprint('contact', __name__)

# Flask-Mail setup
mail = Mail()

# Configure Flask-Mail from environment variables
def init_app(app):
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Gmail SMTP server, change for other providers
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')  # Use environment variable for email
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')  # Use environment variable for password
    app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')  # Default sender email
    mail.init_app(app)


@contact_bp.route('/contact-us', methods=['POST'])
def contact_us():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    # Check if any field is empty
    if not name or not email or not message:
        return jsonify({"message": "All fields are required!"}), 400

    try:
        # Create the email message
        msg = Message(subject="New Contact Us Submission",
                      recipients=["your-email@example.com"],  # Replace with your email
                      body=f"Name: {name}\nEmail: {email}\n\nMessage: {message}")
        
        # Send the email
        mail.send(msg)
        return jsonify({"message": "Your message has been sent!"}), 200
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500
