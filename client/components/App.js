import React, { Component } from "react";

import "./App.scss";

import NavBar from "./NavBar";
import RestaurantList from "./RestaurantList";

class App extends Component {


  render() {
    return (
      <div className="App">
        <NavBar />
        <RestaurantList />
      </div>
    );
  }
}

export default App;
