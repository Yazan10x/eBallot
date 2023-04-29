"""
Testing File
"""
import os

import pytest
# from routes.users.get import get_users


def test_get_users():
    print(os.environ.get("DB_API_USERNAME"))
    assert 1 == 1


if __name__ == '__main__':
    pytest.main([])
