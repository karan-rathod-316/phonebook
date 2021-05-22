import React from "react";

export default function Notifications({
  notificationMessage,
  notificationClass,
}) {
  return <p className={notificationClass}>{notificationMessage}</p>;
}
