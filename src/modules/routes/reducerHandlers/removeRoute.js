import { DELETE_ROUTE } from "../actions";
import initialState from "../initialState";

const removeRoute = (state = initialState, type, payload) => {
  switch (type) {
    case DELETE_ROUTE:
      return {
        ...state,
        routes: state.routes.filter((route) => route.id !== payload.id),
      };

    default:
      return state;
  }
};

export default removeRoute;
