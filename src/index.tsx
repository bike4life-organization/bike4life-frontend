import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RoutesProvider } from "./contexts/routes-provider";
import "./styles/global.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RoutesProvider>
      <App />
    </RoutesProvider>
  </React.StrictMode>
);
