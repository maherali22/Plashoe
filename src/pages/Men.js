import React from "react";
import { useState, useEffect, useContext } from "react";
import "./pagestyle/Men.css";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../hooks/CartContext";
import { AuthContext } from "../hooks/AuthContext";
import axios from "axios";
import tick from "../components/Assets/tick.gif";
import { waveform } from "ldrs";

waveform.register();
const Men = ({ type }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/product");
        const data = response.data;

        const filteredProducts = data.filter(
          (product) => product.type === "men"
        );
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        setError("Error fetching product data.");
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 2000);
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
  if (loading)
    return (
      <p className="loading">
        <l-waveform size="45" stroke="3.5" speed="1" color="black"></l-waveform>
      </p>
    );
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1 className="section-heading">Men's Section</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <h3 className="product-name">{product.name}</h3>

              <p className="product-price">Price: ₹{product.price}</p>
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
          ))
        ) : (
          <p>No products found for {type}</p>
        )}
      </div>
      {/* Notification Message */}
      {showNotification && (
        <div className="notification">
          Product added to cart
          <img className="tick" src={tick} alt="tick" />
        </div>
      )}

      <Footer />
    </>
  );
};

export default Men;
