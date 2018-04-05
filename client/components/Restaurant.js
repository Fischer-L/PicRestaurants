import React, { Component } from "react";

import "./Restaurant.scss";

const yelpRatingIcons = new Map([
  [ 0, "./assets/small_0.png" ],
  [ 1, "./assets/small_1.png" ],
  [ 1.5, "./assets/small_1_half.png" ],
  [ 2, "./assets/small_2.png" ],
  [ 2.5, "./assets/small_2_half.png" ],
  [ 3, "./assets/small_3.png" ],
  [ 3.5, "./assets/small_3_half.png" ],
  [ 4, "./assets/small_4.png" ],
  [ 4.5, "./assets/small_4_half.png" ],
  [ 5, "./assets/small_5.png" ],
]);


class Restaurant extends Component {

  render() {

    // background-image: url("./assets/placeholder_img.png");

    let imgStyle = {
      backgroundImage: `url("./assets/placeholder_img.png")`
    };

    let ratingImg = yelpRatingIcons.get(5);

    return (
      <div className="app-restaurant">
        <a className="app-restaurant__link">
          <img className="app-restaurant__img" style={imgStyle} />
          <div className="app-restaurant__body">
            <h6 className="app-restaurant-title">Fancy places in Honolulu Fancy places in Honolulu Fancy places in Honolulu Fancy places in Honolulu</h6>
            <ul className="app-restaurant__info">
              <li className="app-restaurant__info-item">11:00 ~ 21:00</li>
              <li className="app-restaurant__info-item">1234567890</li>
              <li className="app-restaurant__info-item">Honolulu, on Oahu’s south shore, is capital of Hawaii, and gateway to the U.S. island chain Honolulu, on Oahu’s south shore, is capital of Hawaii, and gateway to the U.S. island chain</li>
            </ul>
            <img className="app-restaurant-rating" src={ratingImg} />
          </div>
        </a>
      </div>
    );
  }
}

export default Restaurant;
