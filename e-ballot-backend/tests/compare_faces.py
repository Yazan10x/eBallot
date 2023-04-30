from io import BytesIO

from routes.users.post import compare_image

# test comparing faces of two images


if __name__ == '__main__':

    with open('tests/data/yazan_id1.jpg', 'rb') as f:
        image_data1 = f.read()

    with open('tests/data/yazan_id2.jpg', 'rb') as f:
        image_data2 = f.read()

    # with open('tests/data/uthman_image.jpg', 'rb') as f:
    #     image_data3 = f.read()

    print(compare_image(BytesIO(image_data1), BytesIO(image_data2)))
