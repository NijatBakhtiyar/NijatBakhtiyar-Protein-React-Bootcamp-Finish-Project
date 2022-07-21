import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./general.scss";

import React from "react";
import ReactDOM from "react-dom";

import { AllProviders } from "./AllProviders";
import { App } from "./App";


// if (import.meta.env.DEV) {
//   const { worker } = await import("./mocks/browser");
//   worker.start({
//     onUnhandledRequest: "bypass",
//   });
// }

ReactDOM.render(
  <AllProviders>
    <App />
  </AllProviders>,
  document.getElementById("root")
);
