# Python Imports
from flask import Flask
from flask_cors import CORS

# Imports
from routes.users import users

app = Flask(__name__)

# Services
app.register_blueprint(users, url_prefix="/users")
CORS(app)


@app.route("/")
def home() -> str:
    return 'eBallot BACKEND API :: Unauthorized Access'


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000, debug=True)
