# Python Imports
import flask
from flask import Blueprint, Response, jsonify
from bson import ObjectId

# Imports
from routes.users import get, post

users = Blueprint('users', __name__)


@users.route("/get_party/<party_id>", methods=['GET'])
def get_party(party_id: str) -> Response:
    return get.get_parties_json(ObjectId(party_id))


@users.route("/get_parties", methods=['GET'])
def get_parties() -> Response:
    return get.get_parties_json()
