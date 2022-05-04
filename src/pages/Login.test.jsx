import React from "react";
import { expect, it } from "vitest";

import { App } from "../App";
import { fireEvent, render, screen } from "../setupTest";

it("User should navigate to home page when login is successful", async () => {
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
});
