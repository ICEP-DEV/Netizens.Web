import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,faThumbsUp,faClock,faClipboard
} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Sidebar from "../../../components/lectureSidebar/sidebar";
import "./dashboard.css";
import Ribbon from "../../../components/admin/ribbon/ribbon";

const LecturerDashboardPage = () => {
  const [name, setName] = useState("");
  const [reports,setreports] = useState([]);

  useEffect(() => {
    
    axios
      .get(
        "http://localhost:5041/api/Getters/GetUserDetails",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setName(response.data.name);
        
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });

      

      axios.get(
        "http://localhost:5041/api/Reports/GetLatestReport",{
          withCredentials:true,
        }
      ).then((response) =>{
               if(Array.isArray(response.data)){
                setreports(response.data);
                toast.success(response.data.message);
               }
               else{
                setreports([response.data]);
               }
      }
    ).catch((error) => {
      console.error("Error fetching reports:" + error);
      toast.error("Failed to fetch reports" + error);
    });

   

  }, []);
  const getStatusStyle = (status) => {
    const s = status;
    if(s === "Pending") return {color:"orange" , fontWeight:"bold"};
    if (s === "Reviewed" || s === "reviewed") return { color: "blue", fontWeight: "bold" };

return {};
  }
  return (
    
     <div className="lecture-page-dashboard-container">
      <Toaster />
      <Ribbon />
    <div className="lecture-dashboard">

      <Sidebar/>

      <div className="lecture-dashboard-main-contents">
        <div className="lecture-dashboard-main-header">
          
          <p className="lecture-dashboard-welcome">Welcome back, {name}</p>
        </div>

        <div className="lecture-dashboard-main-body">

          <div className="lecture-dashboard-vertical-items">

            <div className="lecture-dashboard-item">

              <div className="lecture-dashboard-vertical-info">
                  <FontAwesomeIcon icon={faFolder} className="lecture-dashboard-vertical-items-icons"/>
                  <h3>Total Reports<br/><h1>3</h1></h3>
               </div>
              
            </div>

            <div className="lecture-dashboard-item">
               <div className="lecture-dashboard-vertical-info">
                  <FontAwesomeIcon icon={faThumbsUp} className="lecture-dashboard-vertical-items-icons2"/>
                  <h3>Approved<br/><h1>3</h1></h3>
               </div>
            </div>
            <div className="lecture-dashboard-item">
              <div className="lecture-dashboard-vertical-info">
                  <FontAwesomeIcon icon={faClock} className="lecture-dashboard-vertical-items-icons3"/>
                  <h3>Pending Review<br/><h1>3</h1></h3>
               </div>
            </div>
            <div className="lecture-dashboard-item">
              <div className="lecture-dashboard-vertical-info">
                  <FontAwesomeIcon icon={faClipboard} className="lecture-dashboard-vertical-items-icons4"/>
                  <h3>Drafts<br/><h1>3</h1></h3>
               </div>
            </div>
          </div>

          <div className="lecture-dashboard-table-section">
            <h2 className="lecture-dashboard-table-heading">Recent Submissions:</h2>
            <table className="lecture-dashboard-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Module</th>
                  <th>Submission Date:</th>
                  <th>Review Status:</th>
                </tr>
              </thead>
              <tbody className="lecture-dashboard-tbody">
                {reports.map((report,index) =>(
                <tr key={report.reportId || index}>
                  <td>{index + 1}</td>
                  <td>{report.moduleCode}</td>
                  <td>{report.submissionDate}</td>
                  <td style={getStatusStyle(report.reportStatus)}>{report.reportStatus}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LecturerDashboardPage;
