import React, { Component } from "react";
import { connect } from "react-redux";

import "./RestaurantList.scss";

import Restaurant from "./Restaurant";

class RestaurantList extends Component {

  _renderRestaurants(restaurantsData, targetDate, targetTime) {
    let closed = [];
    let opening = [];
    let day = (new Date(targetDate)).getDay();
    let hh = parseInt(targetTime.substr(0, 2));
    let mm = parseInt(targetTime.substr(3, 2));

    restaurantsData.forEach((data, i) => {
      let props = {
        key: i,
        name: data.name,
        url: data.url,
        address: data.address,
        phone: data.displayPhone || "",
        rating: data.rating > 0 ? data.rating : 0,
        photo: "",
        businessHour: "Closed",
      };
      if (data.photos &&  data.photos.length) {
        props.photo = data.photos[0];
      }

      for (let i = data.openDays.length - 1; i >= 0; --i) {
        let time = data.openDays[i];
        if (day === time.day && 
            hh <= time.end.hh && mm <= time.end.mm &&
            hh >= time.start.hh && mm >= time.start.mm
        ) {
          let end = `${time.end.hh}:${time.end.mm}`;
          let start = `${time.start.hh}:${time.start.mm}`;
          props.businessHour = `${start} ~ ${end}`;
          opening.push(props);
        } else {
          closed.push(props);
        }
      }
    });

    let restaurants = opening.reduce((restaurants, props) => {
      restaurants.push(<Restaurant {...props} />);
      return restaurants;
    }, []);
    
    restaurants = closed.reduce((restaurants, props) => {
      restaurants.push(<Restaurant {...props} />);
      return restaurants;
    }, restaurants);

    return restaurants;
  }

  render() {
    console.log(this.props.targetTime);
    let restaurants = this._renderRestaurants(
      this.props.restaurantsData, this.props.targetDate, this.props.targetTime);
    return (
      <section className="app-restaurant-list app-content-area">
        {restaurants}
      </section>
    );
  }
}

export default connect(state => ({
  restaurantsData: state.restaurantsData,
  targetDate: state.searchCondition.targetDate,
  targetTime: state.searchCondition.targetTime
}))(RestaurantList);
