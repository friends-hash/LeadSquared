import React from "react";
import "./analytics.css";
import { Search, MoreVertical,Pin, FileSpreadsheet,Tag } from "lucide-react";

function Analytics() {
  return (
    <div className="analytics-page">

      {/* LEFT SIDEBAR */}
      <div className="reports-sidebar">

        <h4 className="reports-title">Reports</h4>
        <hr />

        <div className="profile-box">
          <p className="profile-label">View profile as :</p>
          <p className="profile-name">My Space</p>
        </div>

        <div className="reports-menu">
          <div className="menu-item active"><span><Pin /></span> Pinned Reports</div>
          <div className="menu-item"><span><FileSpreadsheet /></span> All Reports</div>
        </div>

        <h5 className="tags-title">Tags</h5>

        <ul className="tags-list">
          <li><span><Tag size={16}/></span>Account Insights</li>
          <li><span><Tag size={16}/></span>Administrative Reports</li>
          <li><span><Tag size={16}/></span>Audit Logs</li>
          <li><span><Tag size={16}/></span>Customer Analysis</li>
          <li><span><Tag size={16}/></span>Emails and Marketing Automation</li>
          <li><span><Tag size={16}/></span>Field Sales Tracking</li>
          <li><span><Tag size={16}/></span>Large Exportable Reports</li>
          <li><span><Tag size={16}/></span>Lead Insights</li>
          <li><span><Tag size={16}/></span>Lead Source Analysis</li>
        </ul>

      </div>


      {/* MAIN CONTENT */}
      <div className="reports-content">

        {/* TOP SEARCH BAR */}
        <div className="reports-topbar">

          <div className="search-box">
            <Search size={16} />
            <input type="text" placeholder="Search any report" />
          </div>

        </div>


        {/* PINNED REPORT HEADER */}
        <div className="pinned-header">

          <h3><span><Pin /></span> Pinned Reports</h3>

          <div className="header-actions">

            <select>
              <option>All Pinned</option>
              <option>Recent</option>
            </select>

            <button className="more-btn">
              <MoreVertical size={18} />
            </button>

          </div>

        </div>


        {/* EMPTY STATE */}
        <div className="empty-state">

          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486809.png"
            alt="No Reports"
          />

          <h4>No Pinned Reports</h4>

          <p>
            Pin all your frequently viewed reports for a quick access.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Analytics;