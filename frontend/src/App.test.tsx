/* eslint-disable import/first */
jest.mock("aws-amplify");

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import amplify from "aws-amplify";

test("displays a greeting after logging in", async () => {
  amplify.Auth.signIn.mockResolvedValue({});

  render(<App />);

  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "an@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "a password" },
  });

  fireEvent.click(screen.getByText(/submit/i));

  const greeting = await screen.findByText(/hello, world!/i);
  expect(greeting).toBeInTheDocument();
});

test("displays an error on incorrect username/password", async () => {
  amplify.Auth.signIn.mockRejectedValue({
    message: "Incorrect username/password",
  });

  render(<App />);

  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "an@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "a password" },
  });

  fireEvent.click(screen.getByText(/submit/i));

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/incorrect username\/password/i);
});
