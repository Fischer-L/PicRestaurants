import React, { Component } from "react";
import { connect } from "react-redux";

import { setSearchCondition } from "../actions";
import { searchRestaurants } from "../utils";

import "./NavBar.scss";

class NavBar extends Component {

  componentDidMount() {

    // TMP
    // let data = {
    //   "name": "Garaje",
    //   "url": "https://www.yelp.com/biz/garaje-san-francisco?adjust_creative=hRMpQlJQDObCpNSJ1qd_fA&utm_campaign=yelp_api_v3&utm_medium=api_v3_graphql&utm_source=hRMpQlJQDObCpNSJ1qd_fA",
    //   "rating": 4.5,
    //   "photos": [
    //     "https://s3-media2.fl.yelpcdn.com/bphoto/_nN_DhLXkfwEkwPNxne9hw/o.jpg"
    //   ],
    //   "displayPhone": "(415) 644-0838",
    //   "address": "475 3rd St\nSan Francisco, CA 94107",
    //   "openDays": [
    //     {
    //       "end": "2200",
    //       "start": "1130",
    //       "day": 0
    //     },
    //     {
    //       "end": "2200",
    //       "start": "1130",
    //       "day": 1
    //     },
    //     {
    //       "end": "2200",
    //       "start": "1130",
    //       "day": 2
    //     },
    //     {
    //       "end": "2200",
    //       "start": "1130",
    //       "day": 3
    //     },
    //     {
    //       "end": "2200",
    //       "start": "1130",
    //       "day": 4
    //     },
    //     {
    //       "end": "2200",
    //       "start": "1700",
    //       "day": 5
    //     }
    //   ]
    // };
    // data = [ data, data, data ];
    // console.log("TMP> setRestaurants");
    // // this.props.setRestaurants(data);

    // searchRestaurants("taipei").then(data => this.props.setRestaurants(data));

    this._populateSearchCondition();
  }

  componentDidUpdate() {
    this._populateSearchCondition();
  }

  // User may changes the location, date and time many times.
  // We only want to set the search condition state when user 
  // explictly commands the search operation to reduce unneccessary reflows.
  // So we populate the input values inside our component here.
  _populateSearchCondition() {
    let { targetLoc, targetDate, targetTime } = this.props.searchCondition;
    console.log("TMP> _populateSearchCondition - targetLoc, targetDate, targetTime", targetLoc, targetDate, targetTime);
    this.locInput.value = targetLoc || "";
    this.dateInput.value = targetDate || "";
    this.timeInput.value = targetTime || "";
  }

  search = e => {
    e.preventDefault();
    e.stopPropagation();
    let targetLoc = this.locInput.value;
    let targetDate = this.dateInput.value;
    let targetTime = this.timeInput.value;
    console.log("TMP> search - targetLoc, targetDate, targetTime", targetLoc, targetDate, targetTime);
    this.props.setSearchCondition(targetLoc, targetDate, targetTime);
  }

  render() {
    return (
      <nav className="app-navbar">
        <section className="app-navbar__top">
          <span className="app-navbar__title app-content-area">PicRestaurants</span>
        </section>
        <section className="app-navbar__bottom">
          <div className="app-navbar__panel app-content-area">
            <input id="app-navbar__loc" className="app-navbar__loc" type="text" placeholder="taipei"
                   ref={input => this.locInput = input} />
            <input id="app-navbar__date" className="app-navbar__date" type="date" 
                   ref={input => this.dateInput = input} />
            <input id="app-navbar__time" className="app-navbar__time" type="time"
                   ref={input => this.timeInput = input} />
            <button className="app-navbar__search" onClick={this.search} onTouchEnd={this.search}>Search</button>
          </div>
        </section>
      </nav>
    );
  }
}

export default connect(state => ({
  targetLoc: state.targetLoc,
  searchCondition: state.searchCondition
}), {
  setSearchCondition
})(NavBar);