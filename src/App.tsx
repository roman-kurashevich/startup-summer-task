import React from "react";

import Content from "./components/Content/Content";
import Header from "./components/Header/Header";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <Content />
    </div>
  );
}

export default App;
