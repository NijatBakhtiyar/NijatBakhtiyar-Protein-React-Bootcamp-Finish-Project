import React from "react";
import { expect, it } from "vitest";

import { App } from "../App";
import { render, screen } from "../setupTest";


it(" user should see his username by getting token  when user login is successful ", async () => {
  localStorage.setItem("token", "token123");
  render(<App />, { route: '/account' });


  const username = await screen.findByText("nicat3@mail.com");
  expect(username).toBeInTheDocument();
});
