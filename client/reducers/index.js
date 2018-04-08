import PropTypes from "prop-types";
import { combineReducers } from "redux";

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

function defaultSearchCondition() {
  let now = (new Date()).toISOString().split("T");
  return {
    targetLoc: "",
    targetDate: now[0],
    targetTime: now[1].substr(0, 5)
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
