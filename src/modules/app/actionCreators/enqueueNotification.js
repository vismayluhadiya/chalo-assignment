import { v4 as uuidv4 } from "uuid";
import { ENQUEUE_NOTIFICATION } from "../actions";

const enqueueNotification = (content, notificationType) => {
  return async (dispatch) => {
    dispatch({
      type: ENQUEUE_NOTIFICATION,
      payload: {
        content: content,
        notificationType: notificationType,
        id: uuidv4()
      }
    });
  };
};

export default enqueueNotification;
