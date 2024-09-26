import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import cart_icon from "../Assets/cart_icon.png";
import user_icon from "../Assets/user_icon.png";
import { CartContext } from "../../hooks/CartContext";
import { AuthContext } from "../../hooks/AuthContext";
const NavBar = ({ toggleSidebar }) => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const navigate = useNavigate();
  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query as the user types
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      // Navigate to the search results page with the query
      navigate(`/search?q=${searchQuery.trim()}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img
            src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/site-logo.svg"
            alt="Site Logo"
            className="logo"
          />
        </Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/men">Men</Link>
        </li>
        <li>
          <Link to="/women">Women</Link>
        </li>
        <li>
          <Link to="/collection">Collection</Link>
        </li>
        <li>
          <Link to="/lookbook">Lookbook</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      {/* Search bar */}
      <form className="navbar-search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="navbar-search-input"
        />
        
      </form>
      <button type="submit" className="navbar-search-btn">
          Search
        </button>
      <div className="navbar-icons">
        {user && (
          <>
            <Link to="/cart">
              <img src={cart_icon} alt="Cart" className="icon cart-logo" />
            </Link>
            {cartItemCount > 0 && (
              <span className="cart-count-badge">{cartItemCount}</span>
            )}
          </>
        )}

        {user ? (
          <div>
            <Link to="/login">
              <span className="user-info2">
                <img src={user_icon} alt="User" className="icon2" />
              </span>
            </Link>
            <span className="user-name">{user.userId}</span>
          </div>
        ) : (
          <Link to="/login">
            <img src={user_icon} alt="User" className="icon" />
          </Link>
        )}
      </div>

      <div className="navbar-toggle" onClick={toggleSidebar}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default NavBar;
