import React, { useState, useEffect } from "react";
import "./notificationsLecturer.css";

const NotificationsLecturer = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Sample deadline notifications
    const sampleDeadlines = [
      {
        id: 1,
        report: "Weekly Report",
        deadline: "2025-05-23T17:00:00",
      },
      {
        id: 2,
        report: "Monthly Summary",
        deadline: "2025-05-30T23:59:00",
      },
      {
        id: 3,
        report: "Activity Log",
        deadline: "2025-05-25T12:00:00",
      },
    ];
    setDeadlines(sampleDeadlines);
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

  return (
    <div className="notifications-page-container">
      <div className="notifications-container">
        <div className="notifications-dashboard">
          <div className="notifications-header">
            <h1 className="notifications-title">Report Deadlines</h1>
            <p className="notifications-subtitle">
              Track your upcoming submission dates
            </p>
            <p className="notifications-datetime">{formattedDateTime}</p>
          </div>

          {deadlines.length === 0 ? (
            <p className="notifications-empty">No deadlines to show.</p>
          ) : (
            <div className="notifications-list">
              {deadlines.map((item) => (
                <div key={item.id} className="notifications-item">
                  <p className="notifications-message">
                    <strong>{item.report}</strong> is due on{" "}
                    {new Date(item.deadline).toLocaleString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsLecturer;