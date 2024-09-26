import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../hooks/CartContext";
import { AuthContext } from "../hooks/AuthContext";
import logout_icon2 from "../components/Assets/logout_icon2.gif";
import "./adminstyle/adminlogout.css";

const Logout = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // Clear user data from AuthContext
    setCart([]); // Clear the cart
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
      navigate("/login"); 
    }, 1000);
  };

  return (
    <div className="logout-body">
      {user && (
        <div>
          <h2>Welcome, {user.userId}!</h2>
          <button className="logout-btn2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      {showNotification && (
        <div className="notification-3">
          Logout successful!
          <img className="logout_icon" src={logout_icon2} alt="tick" />
        </div>
      )}
    </div>
  );
};

export default Logout;
