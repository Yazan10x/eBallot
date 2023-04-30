from bson import ObjectId
from io import BytesIO
from PIL import Image
from routes.users.get import get_user


def open_user(user_id: ObjectId) -> None:
    u = get_user(user_id)

    binary_data = u.profile.id1
    bytes_io = BytesIO(binary_data)
    image = Image.open(bytes_io)
    image.show()

    binary_data = u.profile.id2
    bytes_io = BytesIO(binary_data)
    image = Image.open(bytes_io)
    image.show()


if __name__ == '__main__':
    pass
