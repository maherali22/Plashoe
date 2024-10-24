import React, { useEffect, useState, useContext } from "react";
import "./pagestyle/Home.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { CartContext } from "../hooks/CartContext";
import { AuthContext } from "../hooks/AuthContext";
import tick from "../components/Assets/tick.gif";
const Home = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/product")
      .then((response) => {
        const products = response.data;

        const bestSellers = products.filter((product) => product.rating >= 4.5);

        setBestSellingProducts(bestSellers);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);
  const handleAddToCart = (product) => {
    if (user) {
      addToCart(product);

      // Show notification
      setShowNotification(true);

      // Hide the notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 1000);
    } else {
      alert("Please log in to add products to the cart.");
      navigate("/login");
    }
  };
  /*const handleNavCart = () => {
    navigate("/cart");
  };*/
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="overlay">
          <h1 className="hero-text">Love the planet we walk on</h1>
          <div className="button-container">
            <Link to="/men" className="shop-button">
              Shop Men
            </Link>
            <Link to="/women" className="shop-button">
              Shop Women
            </Link>
          </div>
        </div>
      </div>
      <div className="best-selling-section">
        <h2 className="section-title">Best Selling Products</h2>
        <div className="product-grid">
          {bestSellingProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-imag"
                />
              </Link>

              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <p className="product-rating">Rating: {product.rating} ★</p>
              <div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="add-to-cart-button"
                >
                  Add to Cart
                </button>
                {/* <button onClick={handleNavCart} className="navCart-button">
                  View Cart
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Notification Message */}
      {showNotification && (
        <div className="notification">
          Product added to cart <img className="tick" src={tick} alt="tick" />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
