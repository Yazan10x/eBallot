from routes.users.post import compare_image

# test comparing faces of two images


if __name__ == '__main__':

    with open('tests/data/yazan_id.jpg', 'rb') as f:
        image_data1 = f.read()

    with open('tests/data/yazan_image.jpg', 'rb') as f:
        image_data2 = f.read()
        
    print(compare_image(image_data2, image_data2))
