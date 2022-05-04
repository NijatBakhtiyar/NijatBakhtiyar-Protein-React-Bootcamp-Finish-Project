import React from "react";
import { expect, it } from "vitest";

import { App } from "../App";
import { render, screen } from "../setupTest";

it("user should see products in Home page"  , async () => {
  render(<App />);

  const productBrand = await screen.findByText("Milla");
  expect(productBrand).toBeInTheDocument();

  const productPrice = await screen.findByText("45,00 TL");
  expect(productPrice).toBeInTheDocument();

  const productColor = await screen.findByText("Lacivert");
  expect(productColor).toBeInTheDocument();
});
