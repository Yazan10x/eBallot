"""
Database Orchestrator
"""
import os
import json


def get_db() -> tuple[str, str]:

    if os.environ.get('DB_API_ADDRESS') is not None:
        _DB_HOST = os.environ.get('DB_API_ADDRESS')
        _DB_USERNAME = os.environ.get('DB_API_USERNAME')
        _DB_PASSWORD = os.environ.get('DB_API_KEY')

        _USEC_DB_ADDRESS = f'mongodb+srv://{_DB_USERNAME}:{_DB_PASSWORD}@{_DB_HOST}'
        _USEC_DB_NAME = 'CREW_MS'

    else:
        with open('data_manager/secrets.json') as secret_json:
            secret_json: dict = json.load(secret_json)

        _DB_HOST = secret_json.get('DB_API_ADDRESS')
        _DB_USERNAME = secret_json.get('DB_API_USERNAME')
        _DB_PASSWORD = secret_json.get('DB_API_KEY')

        _USEC_DB_ADDRESS = f'mongodb+srv://{_DB_USERNAME}:{_DB_PASSWORD}@{_DB_HOST}'
        _USEC_DB_NAME = 'CREW_MS'

    return _USEC_DB_ADDRESS, _USEC_DB_NAME


def get_server_keys() -> dict:

    if os.environ.get('DB_API_ADDRESS') is not None:
        return \
            {
                'FRONT_END': os.environ.get('FRONT_END')
            }
    else:
        with open('models/secrets.json') as secret_json:
            secret_json: dict = json.load(secret_json)
        return \
            {
                'FRONT_END': secret_json.get('FRONT_END'),
                'localhost:3000': '1234'
            }
