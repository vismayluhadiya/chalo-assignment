import { DEQUEUE_NOTIFICATION } from "../actions";

const dequeueNotification = (notificationId) => {
  return async (dispatch) => {
    dispatch({
      type: DEQUEUE_NOTIFICATION,
      payload: {
        id: notificationId
      }
    });
  };
};

export default dequeueNotification;
