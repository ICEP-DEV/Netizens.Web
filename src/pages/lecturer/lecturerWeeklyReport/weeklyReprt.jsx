import React from "react";
import "./weeklyReport.css";

const WeeklyReport = () => {
  return (
    <div className="container">
      <h1>Submit weekly report</h1>
      <div className="submission-date">
        <label>Submission Date:</label>
        <input type="date" defaultValue="2025-04-25" />
      </div>

      <form>
        <div className="left-panel">
          <div className="input-group">
            <label>Module:</label>
            <input type="text" placeholder="Auto-filled:" readOnly />
          </div>

          <div className="input-group">
            <label>Week:</label>
            <div className="week-inputs">
              <input type="date" defaultValue="2025-04-07" />
            </div>
          </div>

          <div className="input-group">
            <label>What we did this week:</label>
            <textarea placeholder="e.g., Group A finished unit 3, groups B & C had revision sessions." />
          </div>

          <div className="input-group">
            <label>Any suggestions or challenges faced during the week:</label>
            <textarea placeholder="..." />
          </div>

          <div className="input-group">
            <label>Attachment: (1)</label>
            <div className="attachment-box">
              <span>AttendanceRegister.pdf(1)</span>
            </div>
            <div className="attachment-info">
              File number limit:<br />
              Single File Size Limit:
              <br />
              allowed files types:
            </div>
          </div>
          <div>
            <button className="back-button1">
              <span>&larr;</span> Back to Dashboard
            </button>
          </div>
        </div>

        <div className="right-panel">
          <div className="groups-section">
            <h3>Groups Assigned to Module:</h3>
            <div className="groups-radio">
              <div>
                <label>
                  <input type="radio" name="group" /> Group A
                </label>
                <label>
                  <input type="radio" name="group" /> Group B
                </label>
                <label>
                  <input type="radio" name="group" /> Group C
                </label>
              </div>
              <div>
                <strong># Of Students attended (input)</strong>
                <input type="number" placeholder="e.g., 65" />
              </div>
            </div>
          </div>

          <div className="communication-section">
            <h3>Method of communication with students:</h3>
            <label>
              <input type="checkbox" defaultChecked /> Student Email
            </label>
            <label>
              <input type="checkbox" /> Brightspace (MyTutor)
            </label>
            <label>
              <input type="checkbox" /> WhatsApp
            </label>
            <label>
              <input type="checkbox" /> MS Teams (Online classes)
            </label>
            <label>
              <input type="checkbox" /> Electronic Campus (EC)
            </label>
          </div>

          <div className="button-group">
            <div>
              <button className="button-clear">Clear Form</button>
              <button className="button-submit">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default WeeklyReport;
