import React from 'react'
import './navbar.css'
import { Search, Bell, Baseline, House, UserRound } from 'lucide-react'


function Navbar({ onNavigate }) {
  const [showLeadMenu, setShowLeadMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowLeadMenu((prev) => !prev);
  };

  const handleSmartViewsClick = () => {
    onNavigate('smart-views');
  };

  return (
    <div className="navbar">
      <div className="logo">KavyaInfoweb</div>

      <ul className="menu">
        <li>
          <a href="">
            <House />
          </a>
        </li>
        <li onClick={toggleMenu} className="has-dropdown">
          Lead Management
        </li>
        <li onClick={handleSmartViewsClick}>Smart Views</li>
        <li>Leads</li>
        <li>Activities</li>
        <li>Tasks</li>
        <li>Lists</li>
        <li>Analytics</li>
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
                <li className="active">Lead Management</li>
                <li>Marketing</li>
                <li>Content Library</li>
                <li>Workflow</li>
                <li>Apps</li>
              </ul>
            </div>
            <div className="column right">
              <h4>Smart Views</h4>
              <ul>
                <li>Leads</li>
                <li>Activities</li>
                <li>Tasks</li>
                <li>Lists</li>
                <li>Analytics</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;