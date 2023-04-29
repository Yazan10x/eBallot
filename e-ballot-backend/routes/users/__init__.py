# Python Imports
import flask
from flask import Blueprint, Response, jsonify
from bson import ObjectId

# Imports
from routes.users import get, post

users = Blueprint('users', __name__)


@users.route("/get_user/<user_id>", methods=['GET'])
def get_user(user_id: str) -> Response:
    return get.get_user(ObjectId(user_id))


@users.route("/get_users", methods=['GET'])
def get_users() -> Response:
    return get.get_users()
