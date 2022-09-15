import * as actions from "./actions";
import initialState from "./initialState";
import enqueueNotification from "./reducerHandlers/enqueueNotification";
import dequeueNotification from "./reducerHandlers/dequeueNotification";

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ENQUEUE_NOTIFICATION:
      return enqueueNotification(state, type, payload);

    case actions.DEQUEUE_NOTIFICATION:
      return dequeueNotification(state, type, payload);

    default:
      return state;
  }
};

export default reducers;
