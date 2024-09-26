import React from "react";

import AdminSidebar from "./adminsidebar";
import "./adminstyle/adminlayout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-content">
        {children} {/* Render the page-specific content here */}
      </div>
    </div>
  );
};

export default AdminLayout;
