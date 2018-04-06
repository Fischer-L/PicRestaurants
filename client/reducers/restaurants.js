export default function restaurants(state = [], action) {

  switch (action.type) {
    case "SET_RESTAURANTS":
      state = action.restaurants;
      break;
  }

  return state;
}