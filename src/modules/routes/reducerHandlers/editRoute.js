import { EDIT_ROUTE } from "../actions";
import initialState from "../initialState";

const editRoute = (state = initialState, type, payload) => {
  switch (type) {
    case EDIT_ROUTE:
      return {
        ...state,
        routes: state.routes.map((route) => {
          return route.id === payload.id ? payload.data : route;
        }),
      };

    default:
      return state;
  }
};

export default editRoute;
