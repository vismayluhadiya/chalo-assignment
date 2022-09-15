import { ADD_ROUTE } from "../actions";
import initialState from "../initialState";

const addRoute = (state = initialState, type, payload) => {
  switch (type) {
    case ADD_ROUTE:
      return { ...state, routes: [...state.routes, payload] };

    default:
      return state;
  }
};

export default addRoute;
