from bson import ObjectId
from io import BytesIO
from PIL import Image
from routes.users.get import get_user


def open_user(user_id: ObjectId) -> None:
    u = get_user(user_id)

    binary_data = u.profile.portrait_image
    bytes_io = BytesIO(binary_data)
    image = Image.open(bytes_io)
    image.show()


if __name__ == '__main__':

    open_user(ObjectId("644ca69febcdc710c51d0b3d"))
