"""
Testing File
"""
import pytest
from routes.users.get import get_users


def test_get_users():
    assert get_users().__len__() == 1


if __name__ == '__main__':
    pytest.main([])
