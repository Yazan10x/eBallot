# Python Imports
import flask
from flask import Blueprint, Response, jsonify
from bson import ObjectId

# Imports
from routes.party import get, post

party = Blueprint('party', __name__)


@party.route("/get_party/<party_id>", methods=['GET'])
def get_party(party_id: str) -> Response:
    return get.get_party_json(ObjectId(party_id))


@party.route("/get_parties", methods=['GET'])
def get_parties() -> Response:
    return get.get_parties_json()
