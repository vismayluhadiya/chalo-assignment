import { DELETE_ROUTE } from "../actions";

const removeRoute = (routeId) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_ROUTE,
      payload: {
        id: routeId,
      },
    });
  };
};

export default removeRoute;
