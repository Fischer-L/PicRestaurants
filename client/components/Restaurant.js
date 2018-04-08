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
    let data = this.props;
    let name = data.name;
    let url = data.url ? encodeURI(data.url) : "javascript:void(0)";
    let address = data.address;
    let businessHour = data.businessHour;
    let phone = data.displayPhone || "";

    let rating = data.rating > 0 ? data.rating : 0;
    let ratingImg = yelpRatingIcons.get(rating);
    
    let photo = 
      data.photo ? encodeURI(data.photo) : "./assets/placeholder_img.png";
    let imgStyle = {
      backgroundImage: `url(${photo})`
    };

    return (
      <div className="app-restaurant">
        <a className="app-restaurant__link" href={url} >
          <img className="app-restaurant__img" style={imgStyle} />
          <div className="app-restaurant__body">
            <h6 className="app-restaurant-title">{name}</h6>
            <ul className="app-restaurant__info">
              <li className="app-restaurant__info-item">{businessHour}</li>
              <li className="app-restaurant__info-item">{phone}</li>
              <li className="app-restaurant__info-item">{address}</li>
            </ul>
            <img className="app-restaurant-rating" src={ratingImg} />
          </div>
        </a>
      </div>
    );
  }
}

export default Restaurant;
