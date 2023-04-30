from io import BytesIO

import imagehash
import pytest
from PIL import Image


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


def test_correct():

    with open('tests/data/yazan_id1_1.jpg', 'rb') as f:
        image_data1 = f.read()

    with open('tests/data/yazan_id1_2.png', 'rb') as f:
        image_data2 = f.read()

    assert compare_image(BytesIO(image_data1), BytesIO(image_data2))


def test_false():

    with open('tests/data/yazan_id1_1.jpg', 'rb') as f:
        yazan1 = f.read()

    with open('tests/data/ishav_id1_1.jpg', 'rb') as f:
        ishav1 = f.read()

    with open('tests/data/usman_id1_1.jpg', 'rb') as f:
        usman1 = f.read()

    with open('tests/data/hussain_id1_1.jpg', 'rb') as f:
        hussain1 = f.read()

    assert not (compare_image(BytesIO(yazan1), BytesIO(ishav1)))
    assert not (compare_image(BytesIO(yazan1), BytesIO(usman1)))
    assert not (compare_image(BytesIO(yazan1), BytesIO(hussain1)))

    assert not (compare_image(BytesIO(ishav1), BytesIO(yazan1)))
    assert not (compare_image(BytesIO(ishav1), BytesIO(usman1)))
    assert not (compare_image(BytesIO(ishav1), BytesIO(hussain1)))

    assert not (compare_image(BytesIO(usman1), BytesIO(ishav1)))
    assert not (compare_image(BytesIO(usman1), BytesIO(yazan1)))
    assert not (compare_image(BytesIO(usman1), BytesIO(hussain1)))

    assert not (compare_image(BytesIO(hussain1), BytesIO(ishav1)))
    assert not (compare_image(BytesIO(hussain1), BytesIO(yazan1)))
    assert not (compare_image(BytesIO(hussain1), BytesIO(usman1)))




if __name__ == '__main__':
    pytest.main([])
