import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../hooks/CartContext";
import { AuthContext } from "../hooks/AuthContext";
import "./pagestyle/RegandUser.css";
import logout_icon2 from "../components/Assets/logout_icon2.gif";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setCart } = useContext(CartContext);
  const { user, loginUser, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const validateForm = () => {
    let isValid = true;
    setErrors({}); // Clear previous errors

    if (!userId) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userId: "User ID is required",
      }));
      isValid = false;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.get("http://localhost:5000/users");
        const users = response.data;

        const user = users.find(
          (user) => user.userId === userId && user.password === password
        );

        if (user) {
          if (user.blocked) {
            alert("You are blocked by the admin and cannot log in.");
          } else {
            alert("Login successful!");
            loginUser(user);

            if (user.admin) {
              navigate("/admin");
            } else {
              // If not admin, navigate to home and set their cart
              if (user.cart) {
                setCart(user.cart);
              }
              navigate("/");
            }
          }
        } else {
          alert("Invalid User ID or Password");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrors({ form: "Error logging in" });
      }
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCart([]);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 1000);
    navigate("/login");
  };

  const handleNavHome = () => {
    navigate("/");
  };

  return (
    <div className="form-container">
      {!user ? (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>User ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
              {errors.userId && <p className="error">{errors.userId}</p>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </>
      ) : (
        <div>
          <h2>Welcome, {user.userId}!</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <button className="home-btn" onClick={handleNavHome}>
            Back to Home
          </button>
        </div>
      )}
      {showNotification && (
        <div className="notification3">
          Logout
          <img className="logout_icon" src={logout_icon2} alt="tick" />
        </div>
      )}
    </div>
  );
};

export default Login;
