import dequeueNotification from "./dequeueNotification";
import { DEQUEUE_NOTIFICATION } from "../actions";
import { financeApi } from "../../../helpers/request";
import { getStore, getApiMock } from "../../../helpers/testing";

const store = getStore();
const mock = getApiMock(financeApi);

describe("dequeueNotification actions", () => {
  beforeEach(() => {
    store.clearActions();
    mock.reset();
  });

  it("dispatches dequeueNotification request", async () => {
    const expectedActions = [
      {
        type: DEQUEUE_NOTIFICATION,
        payload: { id: "123" }
      }
    ];

    await store.dispatch(dequeueNotification("123"));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
