import React, { useState, useEffect } from "react";
import "./notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    const sampleNotifications = [
      {
        id: 1,
        message: "New report submitted by John Doe.",
        time: "2 hours ago",
        read: false,
        type: "Alert",
      },
      {
        id: 2,
        message: "Your weekly summary is ready to view.",
        time: "Today at 9:00 AM",
        read: false,
        type: "Message",
      },
      {
        id: 3,
        message: "You have 3 pending approvals.",
        time: "Yesterday",
        read: false,
        type: "Alert",
      },
    ];
    setNotifications(sampleNotifications);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const markAllAsUnread = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: false }))
    );
  };

  const handleFilterSelect = (type) => {
    setFilterType(type);
    setShowFilterPopup(false);
  };

  const filteredNotifications =
    filterType === "All"
      ? notifications
      : notifications.filter((n) => n.type === filterType);

  return (
    <div className="notifications-page-container">
      <div className="notifications-container">
        <div className="notifications-dashboard">
          <div className="notifications-header">
            <h1 className="notifications-title">Notifications</h1>
            <p className="notifications-subtitle">
              Stay up to date with the latest activity
            </p>
            <p className="notifications-datetime">{formattedDateTime}</p>
            <div className="notifications-actions">
              <button onClick={markAllAsRead}>Mark All As Read</button>
              <button onClick={markAllAsUnread}>Mark All As Unread</button>

              <div className="notifications-filter-wrapper">
                <div
                  className="notifications-filter-field"
                  onClick={() => setShowFilterPopup(!showFilterPopup)}
                >
                  {filterType}
                  <span className="dropdown-arrow">&#9662;</span>
                </div>
                {showFilterPopup && (
                  <div className="notifications-filter-popup">
                    <div onClick={() => handleFilterSelect("All")}>All</div>
                    <div onClick={() => handleFilterSelect("Alert")}>Alerts</div>
                    <div onClick={() => handleFilterSelect("Message")}>Messages</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {filteredNotifications.length === 0 ? (
            <p className="notifications-empty">No notifications to display.</p>
          ) : (
            <div className="notifications-list">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notifications-item ${
                    notification.read ? "read" : "unread"
                  }`}
                >
                  <p className="notifications-message">{notification.message}</p>
                  <p className="notifications-time">{notification.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;