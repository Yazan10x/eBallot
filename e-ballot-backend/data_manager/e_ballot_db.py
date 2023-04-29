# Python Imports
from pymongo import MongoClient
from pymongo.collection import Collection

# Imports
from data_manager._e_ballot_secrets import get_db


# Get DB From Cluster
USEC_DB_ADDRESS, USEC_DB_NAME = get_db()
_cluster = MongoClient(USEC_DB_ADDRESS)
_crew_ms_db = _cluster[USEC_DB_NAME]


class E_BALLOT_DB:
    users_coll: Collection = _crew_ms_db.get_collection("users")
