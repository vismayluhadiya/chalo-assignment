import { DEQUEUE_NOTIFICATION } from "../actions";
import initialState from "../initialState";

const dequeueNotification = (state = initialState, type, payload) => {
  switch (type) {
    case DEQUEUE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== payload.id
        )
      };

    default:
      return state;
  }
};

export default dequeueNotification;
