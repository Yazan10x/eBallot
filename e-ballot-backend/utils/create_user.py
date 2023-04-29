from Models.User import User
from bson import ObjectId
from bson.binary import Binary
from data_manager.e_ballot_db import E_BALLOT_DB


def create_user(first_name: str, last_name: str, age: int, government_id_image: Binary, portrait_image: Binary):
    profile = User.Profile(first_name, last_name, age, government_id_image, portrait_image)
    user = User(ObjectId("644ca69febcdc710c51d0b3c"), profile)
    E_BALLOT_DB.users_coll.insert_one(user.to_json())


def get_user(user_id: ObjectId) -> User:
    # user = dict(E_BALLOT_DB.users_coll.find_one({"_id": user_id}))
    # return User.from_json(user)
    print(E_BALLOT_DB.users_coll.count_documents({}))


if __name__ == '__main__':

    # create_user("usman", "tahir", 20, Binary(bytes(0)), Binary(bytes(0)))
    get_user(ObjectId())




