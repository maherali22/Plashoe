import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-close" onClick={toggleSidebar}>
        <span>&times;</span>
      </div>
      <ul>
        <li>
          <Link to="/men" onClick={toggleSidebar}>
            Men
          </Link>
        </li>
        <li>
          <Link to="/women" onClick={toggleSidebar}>
            Women
          </Link>
        </li>
        <li>
          <Link to="/collection" onClick={toggleSidebar}>
            Collection
          </Link>
        </li>
        <li>
          <Link to="/lookbook" onClick={toggleSidebar}>
            Lookbook
          </Link>
        </li>
        <li>
          <Link to="/sale" onClick={toggleSidebar}>
            Sale
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={toggleSidebar}>
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
