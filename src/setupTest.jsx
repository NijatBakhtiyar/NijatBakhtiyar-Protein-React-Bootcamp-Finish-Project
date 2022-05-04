/* eslint-disable import/export */
import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import { AllProviders } from "./AllProviders";
import { server } from "./mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const customRender = (ui, options) => {
  const route = options?.route ?? "/";
  window.history.pushState({}, `${route} page`, route);
  return render(ui, {
    wrapper: AllProviders,
    ...options,
  });
};

export * from "@testing-library/react";
export { customRender as render };
