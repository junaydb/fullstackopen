const Notification = ({ notification }) => {
  if (notification == null) {
    return null;
  }

  const { type, message } = notification;

  const classes = "notif " + type;

  return (
    <div>
      <p className={classes}>{message}</p>
    </div>
  );
};

export default Notification;
