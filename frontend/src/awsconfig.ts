const config = {
  cognito: {
    REGION: "eu-west-2",
    USER_POOL_ID: `${process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID}`,
    APP_CLIENT_ID: `${process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID}`,
  },
};

export default config;
