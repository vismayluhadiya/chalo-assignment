import { ENQUEUE_NOTIFICATION } from "../actions";
import initialState from "../initialState";

const enqueueNotification = (state = initialState, type, payload) => {
  switch (type) {
    case ENQUEUE_NOTIFICATION:
      return { ...state, notifications: [...state.notifications, payload] };

    default:
      return state;
  }
};

export default enqueueNotification;
