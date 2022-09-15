import { EDIT_ROUTE } from "../actions";

const editRoute = (routeId, postData) => {
  return async (dispatch) => {
    dispatch({
      type: EDIT_ROUTE,
      payload: {
        id: routeId,
        data: postData,
      },
    });
  };
};

export default editRoute;
