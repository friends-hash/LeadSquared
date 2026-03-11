import React from "react";
import "./navbar.css";
import { Search, Bell, Baseline, House, ChevronDown } from "lucide-react";

function Navbar({ onNavigate }) {

  const [showLeadMenu, setShowLeadMenu] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState("lead");
  const menuRef = React.useRef(null);

  const toggleMenu = () => {
    setShowLeadMenu(!showLeadMenu);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLeadMenu(false);
      }
    };

    if (showLeadMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLeadMenu]);

  const menuItems = {
    lead: [
      { label: "Smart Views", page: "smart-views" },
      { label: "Leads", page: "leads" },
      { label: "Activities", page: "activities" },
      { label: "Tasks", page: "tasks" },
      { label: "Lists", page: "lists" },
      { label: "Analytics", page: "analytics" }
    ],

    marketing: [
      { label: "Email Campaign", page: "email-campaign" },
      { label: "Website Widget", page: "website-widget" }
    ],

    content: [
      { label: "Email Library", page: "email-library" },
      { label: "Images", page: "images" },
      { label: "Document", page: "document" }
    ],

    workflow: [
      { label: "Automation", page: "automation" }
    ],

    apps: [
      { label: "Apps Marketplace", page: "apps-marketplace" }
    ]
  };

  return (
    <div className="navbar">

      {/* Logo */}
      <div className="logo">KavyaInfoweb</div>

      {/* Navbar Menu */}
      <ul className="menu">

        {/* Home */}
        <li onClick={() => {
          onNavigate("dashboard");
          setShowLeadMenu(false);
        }}>
          <House />
        </li>

        {/* Lead Management Dropdown Button */}
        <li onClick={toggleMenu} className="has-dropdown">
          Lead Management <ChevronDown size={16} />
        </li>

        {/* Dynamic Navbar Submenus */}
        {menuItems[activeMenu].map((item, index) => (
          <li key={index} onClick={() => {
            onNavigate(item.page);
            setShowLeadMenu(false);
          }}>
            {item.label}
          </li>
        ))}

      </ul>

      {/* Right Icons */}
      <div className="nav-icons">
        <a href="#"><Search size={18} /></a>
        <a href="#"><Bell size={18} /></a>
        <a href="#"><Baseline size={18} /></a>
      </div>

      {/* Dropdown Panel */}
      {showLeadMenu && (
        <div className="lead-dropdown" ref={menuRef}>

          {/* Search */}
          <div className="dropdown-search">
            <input type="text" placeholder="Search" />
          </div>

          <div className="dropdown-columns">

            {/* LEFT CATEGORY LIST */}
            <div className="column left">
              <ul>

                <li
                  onClick={() => setActiveMenu("lead")}
                  className={activeMenu === "lead" ? "active" : ""}
                >
                  Lead Management
                </li>

                <li
                  onClick={() => setActiveMenu("marketing")}
                  className={activeMenu === "marketing" ? "active" : ""}
                >
                  Marketing
                </li>

                <li
                  onClick={() => setActiveMenu("content")}
                  className={activeMenu === "content" ? "active" : ""}
                >
                  Content Library
                </li>

                <li
                  onClick={() => setActiveMenu("workflow")}
                  className={activeMenu === "workflow" ? "active" : ""}
                >
                  Workflow
                </li>

                <li
                  onClick={() => setActiveMenu("apps")}
                  className={activeMenu === "apps" ? "active" : ""}
                >
                  Apps
                </li>

              </ul>
            </div>

            {/* RIGHT SUBMENU LIST */}
            <div className="column right">
              <ul>

                {menuItems[activeMenu].map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      onNavigate(item.page);
                      setShowLeadMenu(false);
                    }}
                  >
                    {item.label}
                  </li>
                ))}

              </ul>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Navbar;