# Python Imports
from io import BytesIO

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
def get_user_id_image(user_id: str) -> Response:
    _image = BytesIO(get.get_user(ObjectId(user_id)).profile.government_id_image)
    return send_file(_image, mimetype='image/jpg')


@users.route("/get_user_image/<user_id>", methods=['GET'])
def get_user_image(user_id: str) -> Response:
    _image = BytesIO(get.get_user(ObjectId(user_id)).profile.government_id_image)
    return send_file(_image, mimetype='image/jpg')


@users.route("/get_users", methods=['GET'])
def get_users() -> Response:
    return get.get_users_json()
