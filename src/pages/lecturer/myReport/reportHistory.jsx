import React, { useEffect,useState } from "react";
import "./reportHistory.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/lectureSidebar/sidebar";

const ReportHistory = () => {

  const [reports,setReports] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    axios.get(
      "http://localhost:5041/api/Reports/GetReportDetailsForCurrentUser",
      {
        withCredentials:true,
        headers:{"Content-Type": "applicatin/json" },
        
      }
    ).then((response) =>{
          if(Array.isArray(response.data)){
            setReports(response.data);
            toast.success(response.data.message);
          }
          else{
            setReports([response.data]);
            toast.success(response.data.message);
          }
    }).catch((error)=>{
      console.log("Error fetching reports" + error);
      toast.error("Error fetching reports" + error);
    });
  }, []);
  return (
    <div className="report-history-main-container">
      <Toaster/>
      <Sidebar />
      <div className="report-history-container">
        <h1>Report History</h1>

        <div className="report-history-view-section">
          <label >View By:</label>
          <select >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <h2>March 2025</h2>

        <div className="report-history-table-section">

        <table className="report-history-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Subject Code</th>
              <th>Subject name</th>
              <th>Submitted Date</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody className="report-history-body">
            {reports.map((report,index) =>(
              <tr key={reports.reportID || index}>
              <td>{index+1}</td>
              <td>{report.moduleName}</td>
              <td>{report.moduleCode}</td>
              <td>{report.submissionDate}</td>
              <td>
              <Link className="report-history-view-btn">View</Link>
              </td>
            </tr>
             ))}
          </tbody>
        </table>

        </div>
      </div>
    </div>
  );
};

export default ReportHistory;
