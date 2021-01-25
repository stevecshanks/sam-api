const fs = require("fs");

const outputs = readStackOutputsFromStdin();
writeEnvFile({
  REACT_APP_AWS_COGNITO_USER_POOL_ID: outputs["CognitoUserPoolId"],
  REACT_APP_AWS_COGNITO_APP_CLIENT_ID: outputs["CognitoClientId"],
  REACT_APP_AWS_API_GATEWAY_BASE_URL: outputs["APIBaseURL"],
});

function readStackOutputsFromStdin() {
  const data = fs.readFileSync("/dev/stdin", "utf-8");
  const outputs = JSON.parse(data.toString());

  return outputs.reduce((values, output) => {
    values[output["OutputKey"]] = output["OutputValue"];
    return values;
  }, {});
}

function writeEnvFile(envVariables) {
  const data = Object.keys(envVariables)
    .map((key) => `${key}=${envVariables[key]}\n`)
    .join("");
  fs.writeFileSync(".env", data);
}
