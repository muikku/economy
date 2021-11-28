import React, { useState } from 'react';
import NotificationComponent from '../components/Notification';

const useNotification = () => {
  const [notification, setNotification] = useState(null);

  const notify = (message, severity) => {
    setNotification({ message, severity });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification(null);
  };

  const open = Boolean(notification);

  const Notification = () => (
    <NotificationComponent
      open={open}
      handleClose={handleClose}
      notification={notification}
    />
  );

  return {
    open,
    notification,
    handleClose,
    notify,
    Notification,
  };
};

export default useNotification;
