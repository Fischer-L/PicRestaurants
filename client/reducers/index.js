import { combineReducers } from "redux";
import PropTypes from "prop-types";

import restaurants from "./restaurants";

const APP_TYPE = {};

APP_TYPE.open = PropTypes.arrayOf(PropTypes.shape({
  end: PropTypes.string.isRequired,
  start:  PropTypes.string.isRequired,
  day: PropTypes.number.isRequired,
}.isRequired));

APP_TYPE.restaurant = PropTypes.shape({
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  open: APP_TYPE.open.isRequired,
  url: PropTypes.string,
  rating: PropTypes.number,
  photos: PropTypes.arrayOf(PropTypes.string),
  display_phone:  PropTypes.string,
});

APP_TYPE.restaurants = PropTypes.arrayOf(APP_TYPE.restaurant).isRequired;

export default combineReducers({
  restaurants
});
