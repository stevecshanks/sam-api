import json

from typing import Any, Dict, NamedTuple


Event = Dict[str, Any]


def lambda_handler(event: Event, _: object):
    user = User.from_event(event)

    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "message": f"Hello, {user.name}!",
            }
        ),
        # FIXME
        "headers": {
            "Access-Control-Allow-Origin": "*",
        },
    }


class User(NamedTuple):
    name: str

    @staticmethod
    def from_event(event: Event) -> "User":
        authorizer = event["requestContext"].get("authorizer")
        if not authorizer:
            # SAM does not support Cognito when running locally
            return User(name="Local Host")

        return User(name=authorizer["claims"]["name"])
