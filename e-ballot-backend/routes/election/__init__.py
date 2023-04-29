# Python Imports
import flask
from flask import Blueprint, Response, jsonify
from bson import ObjectId
from Models.ElectionSystem import ElectionSystem

election = Blueprint('election', __name__)


@election.route("/vote/<user_id>/<party_id>", methods=['GET'])
def vote(user_id: str, party_id: str) -> Response:
    return jsonify(ElectionSystem.vote(ObjectId(user_id), ObjectId(party_id)))
