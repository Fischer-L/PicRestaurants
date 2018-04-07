import PropTypes from "prop-types";

const APP_TYPE = {};

APP_TYPE.open = PropTypes.shape({
  // 00:00 ~ 23:59
  end: PropTypes.string.isRequired,
  // 00:00 ~ 23:59
  start:  PropTypes.string.isRequired,
  // 0 ~ 6; 0 is Sun, 6 is Sat
  day: PropTypes.number.isRequired,
});

APP_TYPE.openDays =
  PropTypes.arrayOf(APP_TYPE.open.isRequired).isRequired;

APP_TYPE.restaurant = PropTypes.shape({
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  openDays: APP_TYPE.openDays.isRequired,
  url: PropTypes.string,
  rating: PropTypes.number,
  photos: PropTypes.arrayOf(PropTypes.string),
  displayPhone:  PropTypes.string,
});

APP_TYPE.restaurants = PropTypes.arrayOf(APP_TYPE.restaurant).isRequired;

function isScriptingURL(url) {
  return url.indexOf("javascript") === 0;
}

function nonEmptyString(s) {
  return s && typeof s === "string";
}

function parse24Hours(time) {
  let hh = parseInt(time.substr(0, 2));
  let mm = parseInt(time.substr(2, 2));
  if (0 <= hh && hh <= 23 && 0 <= mm && mm <= 59) {
    return time.substr(0, 2) + ":" + time.substr(2, 2);
  }
  return null;
}

/**
 * Somewhere in our app should do data sanitization and here it is.
 *
 * @restaurants {Array} the data of restaurants from the backend
 * @return {Array} the sanitized data, see APP_TYPE.restaurant for data format.
 */
function sanitizeRestaurants(restaurants) {
  let cleanData = [];

  restaurants.forEach(rest => {
    let data = {
      url: "",
      rating: 0,
      photos: [],
      displayPhone: "",
    };

    let unexpecteds = [];

    // Optional data
    if (!isScriptingURL(rest.url)) {
      data.url = rest.url;
    } else {
      unexpecteds.push("url");
    }

    if (rest.rating >= 0) {
      data.rating = rest.rating;
    } else {
      unexpecteds.push("rating");
    }

    if (rest.photos instanceof Array) {
      data.photos = rest.photos.reduce((photos, p) => {
        if (!isScriptingURL(p)) {
          photos.push(p);
        }
        return photos;
      }, data.photos);
    } else {
      unexpecteds.push("photos");
    }

    if (nonEmptyString(rest.display_phone)) {
      data.displayPhone = rest.display_phone;
    } else {
      unexpecteds.push("display_phone");
    }
    // Optional data end

    // Must data
    if (nonEmptyString(rest.name)) {
      data.name = rest.name;
    } else {
      data = null;
      unexpecteds.push("name");
    }

    if (data && rest.location && nonEmptyString(rest.location.formatted_address)) {
      data.address = rest.location.formatted_address;
    } else {
      data = null;
      unexpecteds.push("location");
    }

    if (data && 
        rest.hours instanceof Array &&
        rest.hours[0] && rest.hours[0].open instanceof Array) {

      data.openDays = rest.hours[0].open.reduce((openDays, time) => {
        let cleanTime = {};
        if (0 <= time.day && time.day <= 6) {
          // The day format from the backend a bit different
          cleanTime.day = time.day + 1;
          if (cleanTime.day > 6) {
            cleanTime.day = 0;
          }
        } else {
          return openDays;
        }

        let end = parse24Hours(time.end);
        if (end) {
          cleanTime.end = end;
        } else {
          return openDays;
        }

        let start = parse24Hours(time.start);
        if (start) {
          cleanTime.start = start;
        } else {
          return openDays;
        }

        openDays.push(cleanTime);
        return openDays;
      }, []);

      if (data.openDays.length === 0) {
        data.openDays = null;
      }
    }
    if (!data.openDays) {
      data = null;
      unexpecteds.push("hours");
    }
    // Must data end

    if (data) {
      cleanData.push(data);
    }
    if (unexpecteds.length) {
      // Warning so know what's wrong
      console.warn("Get unexpected restaurant data", unexpecteds.join(","), rest);
    }
  });

  return cleanData;  
}

/**
 * @param location {String} the location to search
 * @return {Array} the restaurants
 */
async function searchRestaurants(location) {
  let data = [];
  try {
    let query = `location=${location}`;
    let resp = await fetch(`http://localhost:3000/restaurants?${query}`, { method: "GET" });
    if (resp.status !== 200) {
      // We are perfoming a "GET" method so expect a 200 response.
      // If not, throw and let below log it.
      throw `Search restaturants with the response of ${resp.status}`;
    }

    data = await resp.json();
    if (data && data.data && data.data.search && data.data.search.business) {
      data = sanitizeRestaurants(data.data.search.business);
    } else {
      throw `Unexpected data format of ${data}`;
    }

  } catch(e) {
    // Print out so know what's wrong.
    console.error(e);
  }
  return data;
};

export { APP_TYPE, searchRestaurants };