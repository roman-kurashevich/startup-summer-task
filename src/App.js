import Content from "./components/Content/Content";
import Header from "./components/Header/Header";
import "./App.css";

function App() {
  console.log("RENDER APP");

  return (
    <div className="app">
      <Header />
      <Content />
    </div>
  );
}

export default App;
