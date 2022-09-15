import get from "lodash/get";
import { useDispatch } from "react-redux";

import enqueueNotification from "../modules/app/actionCreators/enqueueNotification";

const useNotification = () => {
  const dispatch = useDispatch();
  return {
    error: (content) => {
      return dispatch(enqueueNotification(content, "error"));
    },
    success: (content) => {
      return dispatch(enqueueNotification(content, "success"));
    },
    info: (content) => {
      return dispatch(enqueueNotification(content, "info"));
    },
    warning: (content) => {
      return dispatch(enqueueNotification(content, "warning"));
    },

    apiError: (defaultMessage, callback, path = "response.data.message") => (
      error
    ) => {
      dispatch(enqueueNotification(get(error, path, defaultMessage), "error"));
      if (typeof callback === "function") {
        callback(error);
      }
    }
  };
};

export default useNotification;
