import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./redux/store";
import "./index.scss";

if (
  navigator.userAgent.indexOf("iphone") > -1 ||
  navigator.userAgent.indexOf("android") > -1 ||
  navigator.userAgent.indexOf("webos") > -1
) {
  window.screen.orientation.lock("portrait");
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
