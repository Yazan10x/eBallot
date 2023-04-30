"""
Party Get
"""

from bson import ObjectId
from flask import Response, jsonify
from typing import List

from Models.Party import Party
from data_manager.e_ballot_db import E_BALLOT_DB


def get_party_json(party_id: ObjectId) -> Response:
    party = get_party(party_id).to_json()
    party['_id'] = str(party['_id'])
    return jsonify(party)


def get_party(party_id: ObjectId) -> Party:
    party = dict(E_BALLOT_DB.party_coll.find_one({"_id": party_id}))
    party = Party.from_json(party)
    return party


def get_parties_json() -> Response:
    _parties: List[Party] = get_parties()
    parties: List[dict] = []
    for party in _parties:
        party = party.to_json_simple()
        party['_id'] = str(party['_id'])
        parties.append(party)
    return jsonify(parties)


def get_parties() -> List[Party]:
    mongo_parties = E_BALLOT_DB.party_coll.find()
    parties: List[Party] = []
    for party in mongo_parties:
        party = Party.from_json(party)
        parties.append(party)
    return parties
