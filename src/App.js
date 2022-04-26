import { useState } from "react";
import "./App.css";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  console.log("RENDER APP");

  return (
    <div className="app">
      <Header setSearchTerm={setSearchTerm} />
      <Content searchTerm={searchTerm} />
    </div>
  );
}

export default App;
