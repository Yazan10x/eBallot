# Python Imports
from flask import Flask
from flask_cors import CORS

# Imports
from routes.users import users
from routes.party import party
from routes.election import election

app = Flask(__name__)

# Services
app.register_blueprint(users, url_prefix="/users")
app.register_blueprint(party, url_prefix="/party")
app.register_blueprint(election, url_prefix="/election")
CORS(app)


@app.route("/")
def home() -> str:
    return 'eBallot BACKEND API :: Unauthorized Access'


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5050, debug=True)
