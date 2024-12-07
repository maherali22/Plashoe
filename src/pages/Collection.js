import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../hooks/CartContext";
import { AuthContext } from "../hooks/AuthContext";
import tick from "../components/Assets/tick.gif";
const Collection = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/product")
      .then((response) => {
        const products = response.data;

        const bestSellers = products.filter((product) => product.rating >= 1);

        setBestSellingProducts(bestSellers);
        setLoading(false);
        
      })
      .catch(
        (error) => console.error("Error fetching product data:", error),
        setLoading(false)
      );
  }, []);

  const handleAddToCart = (product) => {
    if (user) {
      addToCart(product);

      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 1000);
    } else {
      alert("Please log in to add products to the cart.");
      navigate("/login");
    }
  };
  if (loading) return <p className="loading">llllllll</p>;
  return (
    <>
      <div className="best-selling-section">
        <h3 className="section-title">Our Collections</h3>
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
    </>
  );
};

export default Collection;
