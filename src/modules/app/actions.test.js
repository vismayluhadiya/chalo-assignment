import * as actions from "./actions";

// NOTIFICATION
test("should define NOTIFICATION actions", () => {
  expect(actions.ENQUEUE_NOTIFICATION).toEqual("app/ENQUEUE_NOTIFICATION");
  expect(actions.DEQUEUE_NOTIFICATION).toEqual("app/DEQUEUE_NOTIFICATION");
});
