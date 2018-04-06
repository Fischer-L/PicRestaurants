import React, { Component } from "react";
import { connect } from "react-redux";

import "./RestaurantList.scss";

import Restaurant from "./Restaurant";

class RestaurantList extends Component {

  render() {
    let restaurants = this.props.restaurants.map((data, i) => {
      return <Restaurant data={data} key={i} />
    });
    return (
      <section className="app-restaurant-list app-content-area">
        {restaurants}
      </section>
    );
  }
}

export default connect(state => ({
  restaurants: state.restaurants
}))(RestaurantList);
