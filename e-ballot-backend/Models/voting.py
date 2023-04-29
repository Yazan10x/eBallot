from __future__ import annotations
from typing import Optional
from bson import ObjectId
from bson.binary import Binary
from datetime import datetime
from routes.users.get import get_usersObject
from Models import User

class Party:
    oid: ObjectId
    name: str
    ontario: list[ObjectId]
    quebec: list[ObjectId]
    bc: list[ObjectId]
    alberta: list[ObjectId]

    def __init__(self, oid, name, ontario, quebec, bc, alberta):
        self.oid = oid
        self.name = name
        self.ontario = ontario
        self.quebec = quebec
        self.bc = bc
        self.alberta = alberta

    @staticmethod
    def from_json(doc: dict) -> Party:
        return User.Profile(
            oid=doc['_id'],
            name=doc['name'],
            ontario=doc['ontario'],
            quebec=doc['quebec'],
            bc=doc['bc'],
            alberta=doc['alberta']
        )

    def to_json(self) -> dict:
        return \
            {
                '_id': self.oid,
                'name': self.name,
                'ontario': self.ontario,
                'quebec': self.quebec,
                'bc': self.bc,
                'alberta': self.alberta
            }

    def get_all_voters(self):
        return self.ontario + self.quebec + self.bc + self.alberta


class VotingSystem:

    votedUsers: dict
    parties: list[Party]

    def __init__(self, votedUsers, parties) -> None:
        self.votedUsers = votedUsers
        self.parties = parties

    # Fix: changed User to str, changed user.oid to user
    def vote(self, user: User, party: Party):
        # step 1: check if the user exists in the database
        # step 2: check if they already voted or not
        # step 3: if they have, then return
        # step 4: if they havent, then decide which party the user wants to vote for and increment the specific party

        allUsers = get_usersObject()

        for i in allUsers:
            if str(user.oid) == i["_id"]:
                if user not in self.votedUsers:
                    self.votedUsers[user] = party
                else:
                    return
                if party not in self.parties:
                    self.partyVotes.append(Party)
                if user.province == 'ontario':
                    party.ontario.append(user.oid)

    # utility methods
    def getPortraitImages(self) -> list:
        images = []
        for i in self.votedUsers:
            images.append(i.portrait_image)
        return images

    # get users who voted for the specifc party
    def getSpecificPartyUsers(self, party: str) -> list:
        users = []
        for user in self.votedUsers:
            if self.votedUsers[user] == party:
                users.append(user)

        return users

    def getWinningParty(self):
        return max(self.partyVotes, key=self.partyVotes.get)

    def totalVotes(self):
        return len(self.votedUsers)





