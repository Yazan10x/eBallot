from __future__ import annotations
from typing import Optional
from bson import ObjectId
from routes.users.get import get_user
from routes.party.get import get_parties, get_party
from data_manager.e_ballot_db import E_BALLOT_DB


class ElectionSystem:

    @staticmethod
    def vote(user_id: ObjectId, party_id: ObjectId) -> bool:
        """
        * If user voted, party ObjectId will be returned,
        * Else, None will be returned
        """
        if ElectionSystem.did_user_vote(user_id) is not None:
            return False
        else:
            ElectionSystem.increment_party_voters(party_id, user_id)
            return True

    @staticmethod
    def did_user_vote(user_id: ObjectId) -> Optional[ObjectId]:
        """
        * If user voted, party ObjectId will be returned,
        * Else, None will be returned
        """
        user = get_user(user_id)
        parties = get_parties()
        for party in parties:
            if user.oid in party.ontario:
                return user.oid
            if user.oid in party.quebec:
                return user.oid
            if user.oid in party.bc:
                return user.oid
            if user.oid in party.alberta:
                return user.oid
        return None

    @staticmethod
    def increment_party_voters(party_id: ObjectId, user_id: ObjectId) -> None:
        user = get_user(user_id)
        party = get_party(party_id)
        if user.province == 'ontario':
            E_BALLOT_DB.party_coll.update_one({'_id': party.oid}, {'$push': {'ontario': user.oid}})
        if user.province == 'quebec':
            E_BALLOT_DB.party_coll.update_one({'_id': party.oid}, {'$push': {'quebec': user.oid}})
        if user.province == 'bc':
            E_BALLOT_DB.party_coll.update_one({'_id': party.oid}, {'$push': {'bc': user.oid}})
        if user.province == 'alberta':
            E_BALLOT_DB.party_coll.update_one({'_id': party.oid}, {'$push': {'alberta': user.oid}})






