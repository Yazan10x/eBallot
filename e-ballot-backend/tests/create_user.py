from Models.User import User
from bson import ObjectId
from bson.binary import Binary
from data_manager.e_ballot_db import E_BALLOT_DB
from datetime import datetime


def create_user(first_name: str, last_name: str, dob: datetime, gender: str, email: str,
                government_id_image: Binary, portrait_image: Binary, province: str):

    profile = User.Profile(first_name, last_name, dob, gender, email, government_id_image, portrait_image)
    user = User(ObjectId(), profile, province)
    E_BALLOT_DB.users_coll.insert_one(user.to_json())


def create_yazan():

    # Yazan
    with open('tests/data/yazan_id1_1.jpg', 'rb') as f:
        image_data = f.read()
    id1 = Binary(image_data)

    create_user("Yazan", "Armoush", datetime(2003, 5, 8), "M", "yazan@armoush.com", id1, id1, "ontario")


def create_usman():
    # Usman
    with open('tests/data/usman_id1_1.jpg', 'rb') as f:
        image_data = f.read()
    id1 = Binary(image_data)

    create_user("Usman", "Tahir", datetime(2002, 5, 4), "M", "usman@tahir.com", id1, id1, "bc")


def create_hussain():
    # Hussain
    with open('tests/data/hussain_id1_1.jpg', 'rb') as f:
        image_data = f.read()
    id1 = Binary(image_data)

    create_user("Hussain", "Omer", datetime(2003, 7, 13), "M", "hussain@omer.com", id1, id1, "quebec")


def create_ishav():
    # Ishav
    with open('tests/data/ishav_id1_1.jpg', 'rb') as f:
        image_data = f.read()
    id1 = Binary(image_data)

    create_user("Ishav", "Sohal", datetime(2002, 9, 26), "M", "ishav@sohal.com", id1, id1, "alberta")


def run():
    E_BALLOT_DB.users_coll.drop()
    # create_yazan()
    # create_usman()
    # create_hussain()
    # create_ishav()


if __name__ == '__main__':
    run()

