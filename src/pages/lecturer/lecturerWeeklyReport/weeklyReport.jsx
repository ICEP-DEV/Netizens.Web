import React from "react";
import "./weeklyReport.css";

const WeeklyReport = () => {
  return (
    <div className="lecturer-Weekly-Report-Container">
      <h1 className="lecturer-Weekly-Report-h1">Submit weekly report</h1>
      
      <form className="lecturer-Weekly-Report-Form">
        <div className="lecturer-Weekly-Report-left-panel">
          <div className="lecturer-Weekly-Report-input-group">
            <label>Module:</label>
            <input type="text" placeholder="Auto-filled:" />
          </div>

          <div className="lecturer-Weekly-Report-input-group">
            <label>Week:</label>
            <div className="lecturer-Weekly-Report-input-week-inputs">
              <input type="date" defaultValue="2025-04-07" />
            </div>
          </div>

          <div className="lecturer-Weekly-Report-input-group">
            <label>What we did this week:</label>
            <textarea placeholder="e.g., Group A finished unit 3, groups B & C had revision sessions." />
          </div>

          <div className="lecturer-Weekly-Report-input-group">
            <label>Any suggestions or challenges faced during the week:</label>
            <textarea placeholder="..." />
          </div>

          <div className="lecturer-Weekly-Report-input-group">
            <label>Attachment: (1)</label>
            <div className="lecturer-Weekly-Report-input-attachment-box">
              <span>AttendanceRegister.pdf(1)</span>
            </div>
            <div className="lecturer-Weekly-Report-input-attachment-info">
              File number limit:<br />
              Single File Size Limit:
              <br />
              allowed files types:
            </div>
          </div>
          <div>
            <button className="lecturer-Weekly-Report-back-button1">
              <span>&larr;</span> Back to Dashboard
            </button>
          </div>
        </div>

        <div className="lecturer-Weekly-Report-right-panel">
          <div className="lecturer-Weekly-Report-groups-section">
            <h3 className="lecturer-Weekly-Report-groups-section-h3">Groups Assigned to Module:</h3>
            <div className="lecturer-Weekly-Report-groups-radio">
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

          <div className="lecturer-Weekly-Report-communication-section">
            <h3 className="lecturer-Weekly-Report-communication-section-h3">Method of communication with students:</h3>
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

          <div className=" lecturer-Weekly-Report-button-group">
            <div>
              <button className="lecturer-Weekly-Report-button-clear">Clear Form</button>
              <button className="lecturer-Weekly-Report-button-submit">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default WeeklyReport;
