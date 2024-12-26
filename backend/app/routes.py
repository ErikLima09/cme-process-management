from flask import Blueprint, request, jsonify
from . import db
from .models import User, Material, Process, Failure

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return 'Hello, Flask with Docker Compose!'
