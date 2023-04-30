# Python Imports
from flask import Blueprint, Response, jsonify
from bson import ObjectId
from Models.ElectionSystem import ElectionSystem
from routes.party import get

election = Blueprint('election', __name__)


@election.route("/vote/<user_id>/<party_name>", methods=['GET'])
def vote(user_id: str, party_name: str) -> Response:
    party = get.get_party_using_query({"name": party_name})
    return jsonify({
        "success": ElectionSystem.vote(ObjectId(user_id), ObjectId(party.oid))
    })


@election.route("/did_user_vote/<user_id>", methods=['GET'])
def did_user_vote(user_id: str) -> Response:
    party_id = ElectionSystem.did_user_vote(ObjectId(user_id))
    if isinstance(party_id, ObjectId):
        return jsonify({
            'success': True,
            'party_id': str(party_id)
        })
    else:
        return jsonify({
            'success': False,
            'party_id': None
        })
