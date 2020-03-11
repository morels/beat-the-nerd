import React from "react";
import Content from "./Content";

function Header() {
  return (
    <header>
      <div
        style={{
          margin: "1rem 0",
          textAlign: "center",
          borderBottom: "2px solid black"
        }}
      >
        <h1>Beat the Nerd</h1>
      </div>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
