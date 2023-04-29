from __future__ import annotations
from typing import Optional
from bson import ObjectId
from bson.binary import Binary
from datetime import datetime
from routes.users.get import get_users
from Models import User, Party

class VotingSystem:

    votedUsers: list[User]
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

        allUsers = get_users()

        if user in allUsers:
            if user not in self.votedUsers:
                self.votedUsers.append(user)

            if party not in self.parties:
                self.parties.append(Party)

            if user.province == 'ontario':
                party.ontario.append(user.oid)

            if user.province == 'quebec':
                party.ontario.append(user.oid)

            if user.province == 'bc':
                party.ontario.append(user.oid)

            if user.province == 'alberta':
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

    def totalVotes(self):
        return len(self.votedUsers)





