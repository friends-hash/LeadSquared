import React from "react";
import "./home.css";
import { Tag } from "lucide-react";

function Home() {
  return (
    <div className="home-container">

      <div className="reports-header">
        <Tag size={18} />
        <h3>Reports Home</h3>
      </div>

      <div className="empty-state">

        <div className="empty-icon">
          📄
        </div>

        <h2>No Tags Found</h2>

        <p>
          Assign a tag to a report to populate this section. Check out the
          All Reports section to access all available reports.
        </p>

      </div>

    </div>
  );
}

export default Home;