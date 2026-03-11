import React from "react";
import "./lists.css";
import { Plus, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

function Lists() {
  const lists = [
    {
      name: "Starred Leads",
      members: 0,
      type: "Static",
      modifiedBy: "System",
      modifiedOn: "01/29/2026 01:19 PM",
      createdBy: "Admin",
      createdOn: "01/29/2026 01:19 PM",
    },
    {
      name: "All Leads",
      members: 0,
      type: "Dynamic",
      modifiedBy: "System",
      modifiedOn: "01/29/2026 01:19 PM",
      createdBy: "System",
      createdOn: "01/29/2026 01:19 PM",
    },
  ];

  return (
    <div className="lists-page">
      
      {/* Page Header */}
      <div className="lists-header">
        <h2>Manage Lists</h2>

        <div className="header-buttons">
          <button className="btn-outline">
            <Plus size={16} /> Add Empty List
          </button>

          <button className="btn-primary">
            <Plus size={16} /> Add List
          </button>

          <button className="icon-btn">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <input type="text" placeholder="Search here" />

        <select>
          <option>List Type</option>
          <option>Static</option>
          <option>Dynamic</option>
        </select>

        <select>
          <option>Created By</option>
          <option>Admin</option>
          <option>System</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>List Name</th>
              <th>Member Count</th>
              <th>List Type</th>
              <th>Actions</th>
              <th>Modified By</th>
              <th>Modified On</th>
              <th>Created By</th>
              <th>Created On</th>
            </tr>
          </thead>

          <tbody>
            {lists.map((list, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{list.name}</td>
                <td>{list.members}</td>
                <td>
                  <span
                    className={
                      list.type === "Static" ? "tag static" : "tag dynamic"
                    }
                  >
                    {list.type}
                  </span>
                </td>
                <td>⋯</td>
                <td>{list.modifiedBy}</td>
                <td>{list.modifiedOn}</td>
                <td>{list.createdBy}</td>
                <td>{list.createdOn}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="table-footer">
          <div className="page-show">Showing 1-2 of 2</div>

          {/* <select>
            <option>Show 25</option>
            <option>Show 50</option>
          </select> */}

          <div className="pagination">
  <button className="page-btn">
    <ChevronLeft size={18} />
  </button>

<div className="page-no">1</div>

  <button className="page-btn">
    <ChevronRight size={18} />
  </button>
</div>
        </div>
      </div>
    </div>
  );
}

export default Lists;