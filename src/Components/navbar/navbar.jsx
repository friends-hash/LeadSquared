import React from 'react'
import './navbar.css'
import { Search, Bell, Baseline, House, UserRound } from 'lucide-react'


function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">KavyaInfoweb</div>

      <ul className="menu">
        <li><a href=""><House /></a></li>
        <li> Lead Management</li>
        <li>Smart Views</li>
        <li>Leads</li>
        <li>Activities</li>
        <li>Tasks</li>
        <li>Lists</li>
        <li>Analytics</li>
      </ul>

      <div className="nav-icons">

        <a href=""><Search  size={18}/></a>
        <a href=""><Bell size={18} /></a>
        <a href=""><Baseline size={18} /></a>
        
      </div>
    </div>
  );
}

export default Navbar;