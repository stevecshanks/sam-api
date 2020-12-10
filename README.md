# sam-api

## Deployment

CircleCI will continuously deploy to AWS when changes are merged to `main`.

To set up credentials, run

```bash
make deploy-user
```

to create an IAM user, then use the AWS console to create an access key for the user.

Then set the following environment variables in CircleCI:

- `AWS_DEFAULT_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
