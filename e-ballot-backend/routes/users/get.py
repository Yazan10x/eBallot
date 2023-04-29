"""
User Get
"""

from bson import ObjectId
from flask import Response, jsonify
from typing import List

from Models.User import User
from data_manager.e_ballot_db import E_BALLOT_DB


def get_user_json(user_id: ObjectId) -> Response:
    user = get_user(user_id).to_json()
    user['_id'] = str(user['_id'])
    user['profile']['government_id_image'] = user['profile']['government_id_image']
    user['profile']['portrait_image'] = user['profile']['portrait_image']
    return jsonify(user)


def get_user(user_id: ObjectId) -> User:
    user = dict(E_BALLOT_DB.users_coll.find_one({"_id": user_id}))
    user = User.from_json(user)
    return user


def get_users_json() -> Response:
    _users: List[User] = get_users()
    users: List[dict] = []
    for user in _users:
        user = user.to_json()
        user['_id'] = str(user['_id'])
        user['profile']['government_id_image'] = user['profile']['government_id_image']
        user['profile']['portrait_image'] = user['profile']['portrait_image']
        users.append(user)
    return jsonify(users)


def get_users() -> List[User]:
    mongo_users = E_BALLOT_DB.users_coll.find()
    users: List[User] = []
    for user in mongo_users:
        user = User.from_json(user)
        users.append(user)
    return users
