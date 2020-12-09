import json

from hello_world import app


def test_lambda_handler():
    response = app.lambda_handler({}, "")

    assert response["statusCode"] == 200

    data = json.loads(response["body"])
    assert data["message"] == "Hello, Unknown Person!"
