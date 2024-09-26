import React from "react";
import "./adminstyle/adminsidebar.css";
import { Link } from "react-router-dom";
import profile_pic2 from "../components/Assets/profile_pic2.png";
const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <img
        src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/site-logo.svg"
        alt="Site Logo"
        className="logo2"
      />

      <ul className="sidebar-menu">
        <li>
          <img src={profile_pic2} alt="profile pic" className="pic" />
          <h4 className="profile-name">Maher</h4>
        </li>
        <li className="profile-name">Administrator</li>
        <li>
          <Link to="/admin" className="sidebar-link">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/products" className="sidebar-link">
            Products
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="sidebar-link">
            Users
          </Link>
        </li>
        <li>
          <Link to="/logout" className="sidebar-link">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
