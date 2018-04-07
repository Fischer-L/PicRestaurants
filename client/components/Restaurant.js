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

  _findOpenTime(restaurant, date) {
    let hh = date.getHours();
    let mm = date.getMinutes();
    let day = date.getDay();
    for (let i = restaurant.openDays.length - 1; i >= 0; --i) {
      let time = restaurant.openDays[i];
      if (time.day === day) {
        let endHH = parseInt(time.end.substr(0, 2));
        let endMM = parseInt(time.end.substr(3, 2));
        if (hh <= endHH && mm <= endMM) {
          let startHH = parseInt(time.start.substr(0, 2));
          let startMM = parseInt(time.start.substr(3, 2));
          if (hh >= startHH && mm >= startMM) {
            return time;
          }
        }
      }
    }
    return null;
  }

  render() {
    let data = this.props.data;
    let name = data.name;
    let url = data.url ? encodeURI(data.url) : "javascript:void(0)";
    let address = data.address;
    let phone = data.displayPhone || "";

    let photo = "./assets/placeholder_img.png";
    if (data.photos &&  data.photos.length) {
      photo = encodeURI(data.photos[0]);
    }
    let imgStyle = {
      backgroundImage: `url(${photo})`
    };

    let rating = data.rating > 0 ? data.rating : 0;
    let ratingImg = yelpRatingIcons.get(rating);
    let open = this._findOpenTime(data, new Date());
    if (open) {
      open = `${open.start} ~ ${open.end}`;
    } else {
      open = "Not in open hour"
    }

    return (
      <div className="app-restaurant">
        <a className="app-restaurant__link" href={url} >
          <img className="app-restaurant__img" style={imgStyle} />
          <div className="app-restaurant__body">
            <h6 className="app-restaurant-title">{name}</h6>
            <ul className="app-restaurant__info">
              <li className="app-restaurant__info-item">{open}</li>
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
