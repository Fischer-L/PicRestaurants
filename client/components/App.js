import React, { Component } from "react";

import "./App.scss";

import NavBar from "./NavBar"

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        Hello App
      </div>
    );
  }
}

export default App;
