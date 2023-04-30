from typing import List
from Models.Party import Party
from bson import ObjectId
from data_manager.e_ballot_db import E_BALLOT_DB


def create_party(oid: ObjectId, name: str, ontario: List[ObjectId], quebec: List[ObjectId], bc: List[ObjectId],
                 alberta: List[ObjectId]):
    party = Party(oid, name, ontario, quebec, bc, alberta)
    E_BALLOT_DB.party_coll.insert_one(party.to_json())


if __name__ == '__main__':
    create_party(ObjectId(), "Liberal", [], [], [], [])
    create_party(ObjectId(), "Conservative", [], [], [], [])
