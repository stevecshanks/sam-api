import json
import pytest

from hello_world import app
from unittest.mock import Mock


@pytest.fixture
def event():
    return {"requestContext": {"authorizer": {"claims": {"email": "an@example.com"}}}}


@pytest.fixture
def context():
    return Mock()


def test_lambda_handler(event, context):
    response = app.lambda_handler(event, context)

    assert response["statusCode"] == 200

    data = json.loads(response["body"])
    assert data["message"] == "Hello, an@example.com!"
