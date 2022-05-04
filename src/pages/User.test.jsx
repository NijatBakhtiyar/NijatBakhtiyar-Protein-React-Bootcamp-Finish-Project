import { fireEvent } from "@testing-library/react";
import React from "react";
import { expect, it } from "vitest";

import { App } from "../App";
import { render, screen } from "../setupTest";

it(" user should see his username by getting token  when user login is successful ", async () => {
  render(<App />);

  const loginButton = await screen.findByText("Giriş Yap");
  expect(loginButton).toBeInTheDocument();
  loginButton.click();

  const emailInput = screen.getByLabelText("Email");
  expect(emailInput).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: "nicat3@mail.com" } });

  const passwordInput = screen.getByLabelText("Şifre");
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: "test1234" } });

  const submitButton = screen.getByText("Giriş");
  submitButton.click();

  const accountLink = await screen.findByText("Hesabım");
  expect(accountLink).toBeInTheDocument();
  

  const accountButton = screen.getByText("Hesabım");
  expect(accountButton).toBeInTheDocument();
  accountButton.click();

  const username = await screen.findByText("nicat3@mail.com");
  expect(username).toBeInTheDocument();
});
