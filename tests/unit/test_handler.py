import json
import pytest

from hello_world import app
from unittest.mock import Mock


@pytest.fixture
def event():
    return {"requestContext": {"authorizer": {"claims": {"name": "An Example"}}}}


@pytest.fixture
def localhost_event():
    return {"requestContext": {}}


@pytest.fixture
def context():
    return Mock()


def test_lambda_handler_returns_user_name(event, context):
    response = app.lambda_handler(event, context)

    assert response["statusCode"] == 200

    data = json.loads(response["body"])
    assert data["message"] == "Hello, An Example!"


def test_lambda_handler_returns_user_name_on_localhost(localhost_event, context):
    response = app.lambda_handler(localhost_event, context)

    assert response["statusCode"] == 200

    data = json.loads(response["body"])
    assert data["message"] == "Hello, Local Host!"
