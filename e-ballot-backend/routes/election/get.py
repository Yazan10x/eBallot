"""
Election Get
"""

from bson import ObjectId
from flask import Response, jsonify
from typing import List

from Models.Party import Party
from data_manager.e_ballot_db import E_BALLOT_DB

sample = {
    "Ontario": {
        "Liberals": 22,
        "Conservative": 19,
    },
    "Quebec": {
        "Liberals": 16,
        "Conservative": 20,
    },
    "British Columbia": {
        "Liberals": 14,
        "Conservative": 11,
    },
    "Alberta": {
        "Liberals": 14,
        "Conservative": 11,
    }
}


def get_election_results() -> Response:
    return jsonify(sample)
