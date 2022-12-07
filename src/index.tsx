import React from "react";
import ReactDOM from "react-dom/client";
import "./custom.scss";
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./components/Store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
