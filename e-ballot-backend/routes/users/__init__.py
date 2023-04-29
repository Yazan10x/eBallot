# Python Imports
import flask
from flask import Blueprint, Response, jsonify, send_file
from bson import ObjectId

# Imports
from routes.users import get, post

users = Blueprint('users', __name__)


@users.route("/get_user/<user_id>", methods=['GET'])
def get_user(user_id: str) -> Response:
    return get.get_user_json(ObjectId(user_id))

@users.route("/get_user_government_id_image/<user_id>", methods=['GET'])
def get_user_id_mage(user_id: str) -> Response:
    image_filename = "tests/data/yazan_id.jpg"
    return send_file(image_filename, mimetype='image/jpg')


@users.route("/get_users", methods=['GET'])
def get_users() -> Response:
    return get.get_users_json()
