import React, { Component } from "react";
import { connect } from "react-redux";

import { setRestaurants } from "../actions";
import { searchRestaurants } from "../utils";

import "./NavBar.scss";

class NavBar extends Component {

  componentDidMount() {
    let data = {
      "name": "Garaje",
      "url": "https://www.yelp.com/biz/garaje-san-francisco?adjust_creative=hRMpQlJQDObCpNSJ1qd_fA&utm_campaign=yelp_api_v3&utm_medium=api_v3_graphql&utm_source=hRMpQlJQDObCpNSJ1qd_fA",
      "rating": 4.5,
      "photos": [
        "https://s3-media2.fl.yelpcdn.com/bphoto/_nN_DhLXkfwEkwPNxne9hw/o.jpg"
      ],
      "displayPhone": "(415) 644-0838",
      "address": "475 3rd St\nSan Francisco, CA 94107",
      "openDays": [
        {
          "end": "2200",
          "start": "1130",
          "day": 0
        },
        {
          "end": "2200",
          "start": "1130",
          "day": 1
        },
        {
          "end": "2200",
          "start": "1130",
          "day": 2
        },
        {
          "end": "2200",
          "start": "1130",
          "day": 3
        },
        {
          "end": "2200",
          "start": "1130",
          "day": 4
        },
        {
          "end": "2200",
          "start": "1700",
          "day": 5
        }
      ]
    };
    data = [ data, data, data ];
    console.log("TMP> setRestaurants");
    // this.props.setRestaurants(data);

    searchRestaurants("taipei").then(data => this.props.setRestaurants(data));
  }

  render() {
    return (
      <nav className="app-navbar">
        <section className="app-navbar__top">
          <span className="app-navbar__title app-content-area">PicRestaurants</span>
        </section>
        <section className="app-navbar__bottom">
          <div className="app-navbar__panel app-content-area">
            <input className="app-navbar__loc" type="text" placeholder="Taipei" />
            <input className="app-navbar__date" type="date" />
            <input className="app-navbar__time" type="time" />
            <button className="app-navbar__search">Search</button>
          </div>
        </section>
      </nav>
    );
  }
}

export default connect(state => state, {
  setRestaurants
})(NavBar);