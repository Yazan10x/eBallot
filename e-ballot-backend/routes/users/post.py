import face_recognition
from io import BytesIO
from PIL import Image

"""
User Post
"""
# from typing import Optional
#
# import flask
# from bson import ObjectId
# from flask import Response, jsonify
#
# from Models.User import User
# from data_manager.e_ballot_db import E_BALLOT_DB

def compare_image(_img1: BytesIO, _img2: BytesIO) -> bool:
    img1 = Image.open(BytesIO(_img1))
    img2 = Image.open(BytesIO(_img2))
    img1 = face_recognition.load_image_file(img1)
    img2 = face_recognition.load_image_file(img2)
    img1_encoding = face_recognition.face_encodings(img1)[0]
    im2_encoding = face_recognition.face_encodings(img2)[0]
    return face_recognition.compare_faces(img1_encoding, im2_encoding)
    
    
    
    
    