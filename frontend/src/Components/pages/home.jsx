import React from "react";
import "./home.css";
import { UserPlus, Clock, Users, UserCheck, CheckSquare, TrendingUp } from "lucide-react";

function Home({ onNavigate }) {
  const handleSegmentClick = (segment) => {
    // Navigate to appropriate page based on segment
    switch (segment) {
      case 'new-leads':
        onNavigate('leads');
        break;
      case 'pending-tasks':
        onNavigate('tasks');
        break;
      case 'engaged-leads':
        onNavigate('leads');
        break;
      case 'customers':
        onNavigate('leads');
        break;
      case 'my-tasks':
        onNavigate('tasks');
        break;
      default:
        break;
    }
  };

  return (
    <div className="home-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Welcome back! Here's an overview of your leads and tasks.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card clickable" onClick={() => handleSegmentClick('new-leads')}>
          <div className="card-icon">
            <UserPlus size={32} />
          </div>
          <div className="card-content">
            <h3>My New Leads</h3>
            <div className="card-stats">
              <span className="stat-number">24</span>
              <span className="stat-label">new this week</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </div>

        <div className="dashboard-card clickable" onClick={() => handleSegmentClick('pending-tasks')}>
          <div className="card-icon">
            <Clock size={32} />
          </div>
          <div className="card-content">
            <h3>My Leads with Pending Tasks</h3>
            <div className="card-stats">
              <span className="stat-number">8</span>
              <span className="stat-label">require attention</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </div>

        <div className="dashboard-card clickable" onClick={() => handleSegmentClick('engaged-leads')}>
          <div className="card-icon">
            <Users size={32} />
          </div>
          <div className="card-content">
            <h3>My Engaged Leads</h3>
            <div className="card-stats">
              <span className="stat-number">156</span>
              <span className="stat-label">actively engaged</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </div>

        <div className="dashboard-card clickable" onClick={() => handleSegmentClick('customers')}>
          <div className="card-icon">
            <UserCheck size={32} />
          </div>
          <div className="card-content">
            <h3>My Customers</h3>
            <div className="card-stats">
              <span className="stat-number">89</span>
              <span className="stat-label">converted customers</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </div>

        <div className="dashboard-card clickable" onClick={() => handleSegmentClick('my-tasks')}>
          <div className="card-icon">
            <CheckSquare size={32} />
          </div>
          <div className="card-content">
            <h3>My Tasks</h3>
            <div className="card-stats">
              <span className="stat-number">12</span>
              <span className="stat-label">pending tasks</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </div>
      </div>

      <div className="dashboard-overview">
        <div className="overview-card">
          <div className="overview-icon">
            <TrendingUp size={24} />
          </div>
          <div className="overview-content">
            <h4>Weekly Performance</h4>
            <p>Lead conversion rate increased by 15% this week</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;