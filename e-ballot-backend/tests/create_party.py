from Models.voting import Party
from bson import ObjectId
from data_manager.e_ballot_db import E_BALLOT_DB


def create_party(oid: ObjectId, name: str, ontario: list[ObjectId], quebec: list[ObjectId], bc: list[ObjectId],
                alberta: list[ObjectId]):
    party = Party(oid, name, ontario, quebec, bc, alberta)
    E_BALLOT_DB.party_coll.insert_one(party.to_json())


if __name__ == '__main__':
    create_party(ObjectId(), "Liberal", [], [], [], [], [], [])
    


