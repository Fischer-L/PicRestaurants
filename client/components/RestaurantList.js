import React, { Component } from "react";
import { connect } from "react-redux";

import "./RestaurantList.scss";

import Restaurant from "./Restaurant";

class RestaurantList extends Component {

  render() {
    return (
      <section className="app-restaurant-list app-content-area">
        <Restaurant />
      </section>
    );
  }
}

export default connect(state => state)(RestaurantList);
