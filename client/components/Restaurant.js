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

  _findOpenIntervalForNow(open) {
    let now = new Date();
    // The day format from the server a bit different
    let day = now.getDay() - 1;
    if (day < 0) {
      day = 6;
    }
    let interval = open.find(time => time.day == day);
    if (interval) {
      return {
        end: `${interval.end.subStr(0, 2)}:${interval.end.subStr(2, 2)}`, 
        start: `${interval.start.subStr(0, 2)}:${interval.start.subStr(2, 2)}`
      };
    }
    return null;
  }

  render() {
    let data = this.props.data;
    let name = data.name;
    let url = encodeURI(data.url) || "javascript:void(0)";
    let address = data.address;
    let phone = data.display_phone || "";

    let photo = "./assets/placeholder_img.png";
    if (data.photos &&  data.photos.length) {
      photo = encodeURI(data.photos[0]);
    }
    let imgStyle = {
      backgroundImage: `url(${photo})`
    };

    let rating = data.rating > 0 ? data.rating : 0;
    let ratingImg = yelpRatingIcons.get(rating);

    let interval = this._findOpenIntervalForNow(data.open);
    if (interval) {
      interval = `${interval.start} ~ ${interval.end}`;
    } else {
      interval = "Closed";
    }

    return (
      <div className="app-restaurant">
        <a className="app-restaurant__link" href={url} >
          <img className="app-restaurant__img" style={imgStyle} />
          <div className="app-restaurant__body">
            <h6 className="app-restaurant-title">{name}</h6>
            <ul className="app-restaurant__info">
              <li className="app-restaurant__info-item">{interval}</li>
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
