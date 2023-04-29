# Python Imports
import flask
from flask import Blueprint, Response, jsonify
from bson import ObjectId

# Imports
from routes.election import get, post

election = Blueprint('election', __name__)


@election.route("/election_results/<party_id>", methods=['GET'])
def get_election_results() -> Response:
    return get.get_election_results()
