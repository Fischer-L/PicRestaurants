import React, { Component } from "react";
import { connect } from "react-redux";

import "./NavBar.scss";

class NavBar extends Component {

  render() {
    return (
      <nav className="app-navbar">
        <section className="app-navbar__top">
          <span className="app-navbar__title app-content-area">PicRestaurants</span>
        </section>
        <section className="app-navbar__bottom">
          <div className="app-navbar__panel app-content-area">
            <input type="text" placeholder="Taipei" />
            <input type="date" />
            <input type="time" />
            <button>Search</button>
          </div>
        </section>
      </nav>
    );
  }
}

export default connect(state => state)(NavBar);
