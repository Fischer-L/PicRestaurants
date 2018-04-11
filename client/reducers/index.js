import PropTypes from "prop-types";
import { combineReducers } from "redux";

// Our app state is as below:
// {
//   status: APP_TYPE.status,
//
//   restaurantData: APP_TYPE.restaurantData,
//
//   searchCondition: APP_TYPE.searchCondition,
// }
const APP_TYPE = {};

APP_TYPE.open = PropTypes.shape({
  // 00:00 ~ 23:59
  end: PropTypes.shape({
    hh: PropTypes.number.isRequired,
    mm: PropTypes.number.isRequired,
  }).isRequired,
  // 00:00 ~ 23:59
  start: PropTypes.shape({
    hh: PropTypes.number.isRequired,
    mm: PropTypes.number.isRequired,
  }).isRequired,
  // 0 ~ 6; 0 is Sun, 6 is Sat
  day: PropTypes.number.isRequired,
});

APP_TYPE.openDays =
  PropTypes.arrayOf(APP_TYPE.open.isRequired);

APP_TYPE.restaurantData = PropTypes.shape({
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  openDays: APP_TYPE.openDays.isRequired,
  url: PropTypes.string,
  rating: PropTypes.number,
  photos: PropTypes.arrayOf(PropTypes.string),
  displayPhone:  PropTypes.string,
});

APP_TYPE.restaurantsData = PropTypes.arrayOf(APP_TYPE.restaurantData);

APP_TYPE.targetLoc = PropTypes.string;
APP_TYPE.targetDate = PropTypes.string; // "YYYY-MM-DD"
APP_TYPE.targetTime = PropTypes.string; // "HH:MM"
APP_TYPE.searchCondition = PropTypes.shape({
  targetLoc: APP_TYPE.targetLoc,
  targetDate: APP_TYPE.targetDate,
  targetTime: APP_TYPE.targetTime
});

// status_idle: Waiting user to search restaurants
// status_searching: Loading restaurants
// status_search_done: Done with the restaurants search
APP_TYPE.status = PropTypes.string;

export { APP_TYPE };

function padWithZero(v) {
  return v < 10 ? "0" + v : "" + v;
}

function defaultSearchCondition() {
  // First make sure the time is always zero UTC offset. 
  let now = (new Date()).toISOString();
  let YYYY = parseInt(now.substr(0, 4));
  let MM = parseInt(now.substr(5, 2)) - 1;
  let DD = parseInt(now.substr(8, 2));
  let hh = parseInt(now.substr(11, 2));
  let mm = parseInt(now.substr(14, 2));
  let ss = parseInt(now.substr(17, 2));
  now = new Date(YYYY, MM, DD, hh, mm, ss);

  // Recalculate `now` based on the timezone
  now = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  YYYY = now.getFullYear();
  MM = padWithZero(now.getMonth());
  DD = padWithZero(now.getDate());
  hh = padWithZero(now.getHours());
  mm = padWithZero(now.getMinutes());

  return {
    targetLoc: "",
    targetDate: `${YYYY}-${MM}-${DD}`,
    targetTime: `${hh}:${mm}`
  };
}

// Below are reducers.
// Right now not many so let's extract them later in the future
function restaurantsData(state = [], action) {
  switch (action.type) {
    case "SET_RESTAURANTS_DATA":
      state = action.restaurantsData;
      break;
  }
  return state;
}

function searchCondition(state = defaultSearchCondition(), action) {
  switch (action.type) {
    case "SET_SEARCH_CONDITION":
      state = action.searchCondition;
      break;
  }
  return state;
}

function status(state = "status_idle", action) {
  switch (action.type) {
    case "SET_APP_STATUS":
      state = action.status;
      break;
  }
  return state;
}

export default combineReducers({
  restaurantsData, searchCondition, status
});
