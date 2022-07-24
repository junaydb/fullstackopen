const Notification = ({ type, message }) => {
  const classes = "notif " + type;

  if (message == null) {
    return null;
  }

  return (
    <div>
      <p className={classes}>{message}</p>
    </div>
  );
};

export default Notification;
