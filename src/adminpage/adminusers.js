import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./adminstyle/adminusers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        // Filter out admin users
        const nonAdminUsers = response.data.filter((user) => !user.admin);
        setUsers(nonAdminUsers);
      })
      .catch((error) => {
        console.error("Error fetching users!", error);
      });
  }, []);

  return (
    <div className="user-list">
      <h1>USER LIST</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userId}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/admin/users/${user.id}`}>
                  <button className="view-btn2">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
