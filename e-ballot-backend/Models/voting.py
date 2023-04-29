from __future__ import annotations
from typing import Optional
from bson import ObjectId
from bson.binary import Binary
from datetime import datetime
from routes.users.get import get_usersObject

class Voting:
    
    def __init__(self) -> None:
        self.votedUsers = {}
        self.partyVotes = {}
        self.allUsers = get_usersObject()

    # Fix: changed User to str, changed user.oid to user
    def vote(self, user: User, party: str):
       # step 1: check if the user exists in the database
       # step 2: check if they already voted or not
       # step 3: if they have, then return
       # step 4: if they havent, then decide which party the user wants to vote for and increment the specific party
       for i in self.allUsers:
        if str(user.oid) == i["_id"]:
            if user not in self.votedUsers:
                self.votedUsers[user] = party
            else:
                return
            if party not in self.partyVotes:
                self.partyVotes[party] = 1
            else:
                self.partyVotes[party] += 1
    
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
        

    
    

    