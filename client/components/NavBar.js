import React, { Component } from "react";
import { connect } from "react-redux";

import { setRestaurants, setSearchCondition, setAppStatus } from "../actions";
import { searchRestaurants } from "../utils";

import "./NavBar.scss";

class NavBar extends Component {

  componentDidMount() {
    this._populateSearchCondition();
  }

  componentDidUpdate() {
    this._populateSearchCondition();
  }

  // User may changes the location, date and time many times.
  // We only want to update the search condition state when user 
  // explictly commands the search operation to reduce unneccessary reflows.
  // So we populate the input values inside our component here.
  _populateSearchCondition() {
    let { targetLoc, targetDate, targetTime } = this.props.searchCondition;
    this.locInput.value = targetLoc || "";
    this.dateInput.value = targetDate || "";
    this.timeInput.value = targetTime || "";
  }

  _scheduleSearch(location) {
    // Lazy creation...
    if (!this._currentSearchRequest) {
      this._currentSearchRequest = {};
      this._currentSearchRequest.run = async () => {
        let loc = this._currentSearchRequest.location;
        let data = await searchRestaurants(loc);
        if (loc !== this._currentSearchRequest.location) {
          // The search location has changed.
          // These results now are outdated...
          return; 
        }
        this._currentSearchRequest.handle = 
        this._currentSearchRequest.location = null;
        this.props.setRestaurants(data);
        this.props.setAppStatus("status_search_done");
      };
    }
    
    location = location.toLowerCase();
    if (this._currentSearchRequest.location === location) {
      return; // Already under searching
    }
    if (this._currentSearchRequest.handle) {
      window.cancelAnimationFrame(this._currentSearchRequest.handle);
    }
    this._currentSearchRequest.location = location;
    this._currentSearchRequest.handle =
      window.requestAnimationFrame(this._currentSearchRequest.run);
  }

  search() {
    let targetLoc = this.locInput.value;
    let targetDate = this.dateInput.value;
    let targetTime = this.timeInput.value;
    // Only proceed if there is really a location to search.
    if (!targetLoc) {
      this.locInput.classList.add("app-navbar--warning");
      return;
    }
    this.locInput.classList.remove("app-navbar--warning");

    this.props.setSearchCondition(targetLoc, targetDate, targetTime);
    this.props.setAppStatus("status_searching");
    this._scheduleSearch(targetLoc);
  }

  onKeyUp = e => {
    if (e.key.toLowerCase() == "enter") {
      this.search();
    } 
  }

  onClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.search();
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
                   ref={input => this.locInput = input} onKeyUp={this.onKeyUp} />
            <input id="app-navbar__date" className="app-navbar__date" type="date" 
                   ref={input => this.dateInput = input} onKeyUp={this.onKeyUp} />
            <input id="app-navbar__time" className="app-navbar__time" type="time"
                   ref={input => this.timeInput = input} onKeyUp={this.onKeyUp} />
            <button className="app-navbar__search" onClick={this.onClick} onTouchEnd={this.onClick}>Search</button>
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
  setRestaurants,
  setSearchCondition,
  setAppStatus
})(NavBar);
