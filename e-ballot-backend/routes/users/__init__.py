# Python Imports
import base64
from io import BytesIO
from PIL import Image
from flask import Blueprint, Response, jsonify, request, send_file
from bson import ObjectId

# Imports
from routes.users import get, post

users = Blueprint('users', __name__)


@users.route("/get_user/<user_id>", methods=['GET'])
def get_user(user_id: str) -> Response:
    return get.get_user_json(ObjectId(user_id))


@users.route("/id1/<user_id>", methods=['GET'])
def get_user_id1(user_id: str) -> Response:
    _image = BytesIO(get.get_user(ObjectId(user_id)).profile.id1)
    return send_file(_image, mimetype='image/jpg')


@users.route("/id2/<user_id>", methods=['GET'])
def get_user_id2(user_id: str) -> Response:
    _image = BytesIO(get.get_user(ObjectId(user_id)).profile.id2)
    return send_file(_image, mimetype='image/jpg')


@users.route("/get_user_image/<user_id>", methods=['GET'])
def get_user_image(user_id: str) -> Response:
    _image = BytesIO(get.get_user(ObjectId(user_id)).profile.id1)
    return send_file(_image, mimetype='image/jpg')


@users.route("/get_users", methods=['GET'])
def get_users() -> Response:
    return get.get_users_json()


@users.route("/authenticate_user", methods=['POST'])
def authenticate_user() -> Response:
    data: str = dict(request.get_json(silent=True)).get("data")
    print("\n========================================")
    print("The Data Length is: " + data.__len__().__str__())
    print("========================================\n")

    base64_str = data.split(",")[1]
    jpg_bytes = base64.b64decode(base64_str)
    bytes_io = BytesIO(jpg_bytes)
    user_id = post.authenticate_user(bytes_io)

    # user_id = ObjectId("644ca69febcdc710c51d0b3d")
    image = Image.open(bytes_io)
    image.show()
    print("The user: " + str(user_id))
    print("========================================\n")

    if isinstance(user_id, ObjectId):
        return jsonify({
            'success': True,
            'user_id': str(user_id)
        })
    else:
        return jsonify({
            'success': False,
            'user_id': None
        })
