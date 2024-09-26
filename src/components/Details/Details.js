import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Details.css";
import Footer from "../../pages/Footer";
import { CartContext } from "../../hooks/CartContext";
import { AuthContext } from "../../hooks/AuthContext";
import tick from "../Assets/tick.gif";
const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        const productData = response.data;
        setProduct(productData);

        const relatedResponse = await axios.get(
          `http://localhost:5000/product?type=${productData.type}`
        );
        const filteredRelatedProducts = relatedResponse.data.filter(
          (relatedProduct) => relatedProduct.id !== productData.id
        );

        setRelatedProducts(filteredRelatedProducts);
      } catch (error) {
        console.error("Error fetching the product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    if (user) {
      addToCart(product);

      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 800);
    } else {
      alert("Please log in to add products to the cart.");
      navigate("/login");
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="product-detail">
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>
          <strong>Price: </strong> ₹{product.price}
        </p>

        <p>
          <strong>Category: </strong> {product.type}
        </p>
        <p>
          <strong>Brand: </strong> {product.brand}
        </p>
        <p>
          <strong>Rating: </strong> {product.rating} ★
        </p>
        <p>
          <strong>Reviews: </strong> {product.reviews}
        </p>

        <div>
          <button
            onClick={() => handleAddToCart(product)}
            className="cart-button"
          >
            Add to Cart
          </button>
          <button onClick={() => navigate("/")} className="home-button">
            Back to Home
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      <h1 style={{ textAlign: "center" }}>Related Products</h1>
      <div className="related-products">
        <div className="related-products-list">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="related-product-item">
              <img src={relatedProduct.image} alt={relatedProduct.name} />
              <h4>{relatedProduct.name}</h4>
              <p>₹{relatedProduct.price}</p>

              <div className="related-product-buttons">
                <button
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  className="view-button"
                >
                  View
                </button>
                <button
                  onClick={() => handleAddToCart(relatedProduct)}
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
    </div>
  );
};

export default Details;
