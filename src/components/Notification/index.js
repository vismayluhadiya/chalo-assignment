import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";

import dequeueNotification from "../../modules/app/actionCreators/dequeueNotification";

const Notification = () => {
  const notifications = useSelector((state) => state.app.notifications);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(dequeueNotification(notification.id));
  };

  if (notifications.length === 0) {
    return null;
  }

  const notification = notifications[0];

  return (
    <Snackbar
      key={notification.id}
      open={true}
      autoHideDuration={7000}
      onClose={() => handleClose(notification.id)}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ maxWidth: { sm: "500px" } }}
    >
      <Alert
        onClose={() => handleClose(notification.id)}
        severity={notification.notificationType}
        sx={{ width: "100%" }}
      >
        {notification.content}
      </Alert>
    </Snackbar>
  );
};

Notification.prototype = {
  notificationType: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Notification;
