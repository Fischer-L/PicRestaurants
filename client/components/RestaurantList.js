import React, { Component } from "react";
import { connect } from "react-redux";

import "./RestaurantList.scss";

import Restaurant from "./Restaurant";

class RestaurantList extends Component {

  _compareTime(aHH, aMM, bHH, bMM) {
    if (aHH === bHH) {
      if (aMM > bMM) {
        return 1;
      } else if (aMM === bMM) {
        return 0;
      } else {
        return -1;
      }
    } else if (aHH > bHH) {
      return 1;
    }
    return -1;
  }

  _withinTimeInterval(hh, mm, start, end) {
    return this._compareTime(hh, mm, end.hh, end.mm) <= 0 &&
           this._compareTime(hh, mm, start.hh, start.mm) >= 0
  }

  _formatTime(hh, mm) {
    if (hh < 10) {
      hh = "0" + hh;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return `${hh}:${mm}`;
  }

  _renderRestaurants(restaurantsData, targetDate, targetTime) {
    let closed = [];
    let opening = [];
    let date = targetDate ? new Date(targetDate) : new Date();
    let day = date.getDay();
    let hh = null;
    let mm = null;
    if (targetTime) {
      hh = parseInt(targetTime.substr(0, 2));
      mm = parseInt(targetTime.substr(3, 2));
    }

    restaurantsData.forEach((data, idx) => {
      let props = {
        key: idx,
        name: data.name,
        url: data.url,
        address: data.address,
        phone: data.displayPhone || "",
        rating: data.rating > 0 ? data.rating : 0,
        photo: "",
        businessHour: "Not in business hour",
      };

      if (data.photos && data.photos.length) {
        props.photo = data.photos[0];
      }

      let isOpen = false;
      for (let i = data.openDays.length - 1; i >= 0; --i) {
        let time = data.openDays[i];
        if (day === time.day && 
            (!targetTime || this._withinTimeInterval(hh, mm, time.start, time.end))
        ) {
          let end = this._formatTime(time.end.hh, time.end.mm);
          let start = this._formatTime(time.start.hh, time.start.mm);
          props.businessHour = `${start} ~ ${end}`;
          isOpen = true;
          break;
        }
      }

      if (isOpen) {
        opening.push(props);
      } else {
        closed.push(props);
      }
    });

    // We would like to put opening restaurants in the front
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
    let restaurants = this._renderRestaurants(
      this.props.restaurantsData, this.props.targetDate, this.props.targetTime);
    console.log("TMP> RestaurantList", this.props.restaurantsData, restaurants.length);
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
