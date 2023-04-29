from Models.User import User
from bson import ObjectId
from bson.binary import Binary
from data_manager.e_ballot_db import E_BALLOT_DB
from io import BytesIO
from PIL import Image


def create_user(first_name: str, last_name: str, dob: datetime, email: str, government_id_image: Binary, portrait_image: Binary):
    profile = User.Profile(first_name, last_name, dob, email, government_id_image, portrait_image)
    user = User(ObjectId("644ca69febcdc710c51d0b3d"), profile)
    E_BALLOT_DB.users_coll.insert_one(user.to_json())


def get_user(user_id: ObjectId) -> User:
    user = dict(E_BALLOT_DB.users_coll.find_one({"_id": user_id}))
    return User.from_json(user)


if __name__ == '__main__':

    # with open('tests/data/yazan_id.jpg', 'rb') as f:
    #     image_data = f.read()
    # gov_id_image = Binary(image_data)
    #
    # with open('tests/data/yazan_image.jpg', 'rb') as f:
    #     image_data = f.read()
    # port_image = Binary(image_data)
    #
    # create_user("Yazan", "Armoush", 19, gov_id_image, port_image)
    u = get_user(ObjectId("644ca69febcdc710c51d0b3d"))
    binary_data = u.profile.government_id_image

    # Create a BytesIO object and write the binary data to it
    bytes_io = BytesIO(binary_data)

    # Open the image from the BytesIO object using the Image module from PIL
    image = Image.open(bytes_io)

    # Display the image using the show() method or save it using the save() method
    image.show()
