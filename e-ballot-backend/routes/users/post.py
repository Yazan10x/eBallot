from io import BytesIO
from typing import Optional
from PIL import Image
import imagehash
from bson import ObjectId
from routes.users.get import get_users


def authenticate_user(_img1: BytesIO) -> Optional[ObjectId]:
    users = get_users()
    for user in users:
        binary_data = user.profile.id1
        _img2 = BytesIO(binary_data)
        if compare_image(_img1, _img2):
            return user.oid
    return None


def compare_image(_img1: BytesIO, _img2: BytesIO) -> bool:

    hash0 = imagehash.average_hash(Image.open(_img1))
    hash1 = imagehash.average_hash(Image.open(_img2))
    score = 1.0 - ((hash0 - hash1) / 32)

    print("\n========================================")
    print("The Score: " + str(score))
    print("========================================\n")

    if score == 1.0:
        return True
    elif score >= 0.5:
        return True
    else:
        return False




