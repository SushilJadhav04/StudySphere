from flask import Blueprint

google_auth_bp = Blueprint('google_auth', __name__, url_prefix='/auth')

from . import routes
