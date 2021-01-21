import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./awsconfig";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  ReactElement,
  SetStateAction,
} from "react";
import { useState } from "react";
import { Alert } from "react-bootstrap";

function App(): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn ? (
          <Greeting />
        ) : (
          <LogInForm setIsLoggedIn={setIsLoggedIn} />
        )}
      </header>
    </div>
  );
}

interface LogInProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

function LogInForm({ setIsLoggedIn }: LogInProps): ReactElement {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>();

  async function logMeIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    Amplify.configure({
      Auth: {
        region: awsconfig.cognito.REGION,
        userPoolId: awsconfig.cognito.USER_POOL_ID,
        userPoolWebClientId: awsconfig.cognito.APP_CLIENT_ID,
        authenticationFlowType: "USER_PASSWORD_AUTH",
      },
    });

    try {
      setErrorMessage(null);
      await Auth.signIn(emailAddress, password);
      setIsLoggedIn(true);
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  return (
    <>
      <Alert show={!!errorMessage} variant="danger">
        {errorMessage}
      </Alert>
      <Form onSubmit={logMeIn}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="sr-only">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email address"
            value={emailAddress}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmailAddress(e.target.value)
            }
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="sr-only">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

function Greeting(): ReactElement {
  return <p>Hello, World!</p>;
}

export default App;
