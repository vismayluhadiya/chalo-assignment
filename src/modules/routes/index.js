import * as actions from "./actions";
import initialState from "./initialState";
import addRoute from "./reducerHandlers/addRoute";
import editRoute from "./reducerHandlers/editRoute";
import removeRoute from "./reducerHandlers/removeRoute";

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_ROUTE:
      return addRoute(state, type, payload);

    case actions.DELETE_ROUTE:
      return removeRoute(state, type, payload);

    case actions.EDIT_ROUTE:
      return editRoute(state, type, payload);

    default:
      return state;
  }
};

export default reducers;
