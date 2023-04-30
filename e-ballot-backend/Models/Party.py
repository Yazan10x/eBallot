from __future__ import annotations
from typing import Optional
from bson import ObjectId
from bson.binary import Binary
from datetime import datetime
from routes.users.get import get_users
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
        return Party(
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
                'alberta': self.alberta,
                'total_votes': self.get_all_voters()
            }

    def to_json_simple(self) -> dict:
        return \
            {
                '_id': self.oid,
                'name': self.name,
                'ontario': self.ontario.__len__(),
                'quebec': self.quebec.__len__(),
                'bc': self.bc.__len__(),
                'alberta': self.alberta.__len__(),
                'total_votes': self.get_all_voters().__len__()
            }

    def get_all_voters(self):
        return self.ontario + self.quebec + self.bc + self.alberta

