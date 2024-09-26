import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./adminstyle/admindashbord.css";

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        const users = response.data;
        setUsersCount(users.length);

        let totalRevenue = 0;
        let totalOrders = 0;

        users.forEach((user) => {
          if (user.orderedItems && Array.isArray(user.orderedItems)) {
            user.orderedItems.forEach((order) => {
              totalRevenue += order.totalAmount || 0;
              totalOrders += 1;
            });
          }
        });

        setTotalRevenue(totalRevenue);
        setOrderCount(totalOrders);
      })
      .catch(() => {
        setError("Error fetching users data. Please try again.");
      });

    axios
      .get("http://localhost:5000/product")
      .then((response) => {
        setProductsCount(response.data.length);
      })
      .catch((error) => {
        setError("Error fetching products data. Please try again.");
      });
  }, []);

  useEffect(() => {
    if (usersCount === 0 && orderCount === 0 && productsCount === 0) return;

    const ctx = document.getElementById("revenueChart").getContext("2d");
    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Users", "Orders", "Products"],
        datasets: [
          {
            label: "Dashboard Overview",
            data: [usersCount, orderCount, productsCount],
            backgroundColor: ["#f39c12", "#e74c3c", "#3498db"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      newChart.destroy();
    };
  }, [usersCount, orderCount, productsCount]);

  return (
    <div className="dashboard-container">
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="grid-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{usersCount}</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p>{orderCount}</p>
        </div>

        <div className="card">
          <h3>Total Products</h3>
          <p>{productsCount}</p>
        </div>
      </div>
      <div className="chart-section">
        <canvas id="revenueChart"></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
