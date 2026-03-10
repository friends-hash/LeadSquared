import React from 'react'
import './navbar.css'
import { Search, Bell, Baseline, House, UserRound } from 'lucide-react'


function Navbar({ onNavigate, currentPage }) {
  const [showLeadMenu, setShowLeadMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowLeadMenu((prev) => !prev);
  };

  const handleNavClick = (page) => {
    onNavigate(page);
    setShowLeadMenu(false);
  };

  return (
    <div className="navbar">
      <div className="logo">KavyaInfoweb</div>

      <ul className="menu">
        <li onClick={() => handleNavClick('home')}>
          <a href="">
            <House />
          </a>
        </li>
        <li onClick={toggleMenu} className="has-dropdown">
          Lead Management
        </li>
        <li onClick={() => handleNavClick('smart-views')}>Smart Views</li>
        <li onClick={() => handleNavClick('leads')}>Leads</li>
        <li onClick={() => handleNavClick('activities')}>Activities</li>
        <li onClick={() => handleNavClick('tasks')}>Tasks</li>
        <li onClick={() => handleNavClick('lists')}>Lists</li>
        <li onClick={() => handleNavClick('analytics')}>Analytics</li>
      </ul>

      <div className="nav-icons">
        <a href="">
          <Search size={18} />
        </a>
        <a href="">
          <Bell size={18} />
        </a>
        <a href="">
          <Baseline size={18} />
        </a>
      </div>

      {/* dropdown panel shown when Lead Management clicked */}
      {showLeadMenu && (
        <div className="lead-dropdown">
          <div className="dropdown-search">
            <input type="text" placeholder="Search" />
          </div>
          <div className="dropdown-columns">
            <div className="column left">
              <ul>
                <li className="active" onClick={() => handleNavClick('lead-management')}>Lead Management</li>
                <li onClick={() => handleNavClick('marketing')}>Marketing</li>
                <li onClick={() => handleNavClick('content-library')}>Content Library</li>
                <li onClick={() => handleNavClick('workflow')}>Workflow</li>
                <li onClick={() => handleNavClick('apps')}>Apps</li>
              </ul>
            </div>
            <div className="column right">
              <h4>Smart Views</h4>
              <ul>
                <li onClick={() => handleNavClick('leads')}>Leads</li>
                <li onClick={() => handleNavClick('activities')}>Activities</li>
                <li onClick={() => handleNavClick('tasks')}>Tasks</li>
                <li onClick={() => handleNavClick('lists')}>Lists</li>
                <li onClick={() => handleNavClick('analytics')}>Analytics</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;