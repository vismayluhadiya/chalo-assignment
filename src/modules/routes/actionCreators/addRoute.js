import { ADD_ROUTE } from "../actions";

const addRoute = (postData) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_ROUTE,
      payload: postData,
    });
  };
};

export default addRoute;
