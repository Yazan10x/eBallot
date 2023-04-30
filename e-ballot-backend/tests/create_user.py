from Models.User import User
from bson import ObjectId
from bson.binary import Binary
from data_manager.e_ballot_db import E_BALLOT_DB
from datetime import datetime


def create_user(first_name: str, last_name: str, dob: datetime, gender: str, email: str,
                government_id_image: Binary, portrait_image: Binary, province: str):
    profile = User.Profile(first_name, last_name, dob, gender, email, government_id_image, portrait_image)
    user = User(ObjectId("644ca69febcdc710c51d0b3d"), profile, province)
    E_BALLOT_DB.users_coll.insert_one(user.to_json())


if __name__ == '__main__':
    
    # Yazan
    with open('tests/data/yazan_id1.jpg', 'rb') as f:
        image_data = f.read()
    gov_id_image = Binary(image_data)

    with open('tests/data/yazan_image.jpg', 'rb') as f:
        image_data = f.read()
    port_image = Binary(image_data)

    create_user("Yazan", "Armoush", datetime(2003, 5, 8), "M", "yazan@armoush.com", gov_id_image, port_image, "ontario")
    
    
    #Usman
    with open('tests/data/usman_id1.jpg', 'rb') as f:
        image_data = f.read()
    gov_id_image = Binary(image_data)

    create_user("Usman", "Tahir", datetime(2002, 5, 4), "M", "usman@tahir.com", gov_id_image, port_image, "bc")
    
    
    #Hussain
    with open('tests/data/hussain_id1.jpg', 'rb') as f:
        image_data = f.read()
    gov_id_image = Binary(image_data)

    create_user("Hussain", "Omer", datetime(2003, 7, 13), "M", "hussain@omer.com", gov_id_image, port_image, "quebec")
    
    
    #Ishav
    with open('tests/data/ishav_id1.jpg', 'rb') as f:
        image_data = f.read()
    gov_id_image = Binary(image_data)

    create_user("Ishav", "Sohal", datetime(2003, 9, 26), "M", "ishav@sohal.com", gov_id_image, port_image, "alberta")
