export const setRestaurants = restaurantsData => ({
  type: "SET_RESTAURANTS_DATA",
  restaurantsData
});

export const setSearchCondition = (targetLoc, targetDate, targetTime) => ({
  type: "SET_SEARCH_CONDITION",
  searchCondition: { targetLoc, targetDate, targetTime }
});

export const setAppStatus = status => ({
  type: "SET_APP_STATUS",
  status
});
