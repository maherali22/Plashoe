import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./adminstyle/productdetails.css";

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:5000/product/${id}`)
        .then(() => {
          alert("Product deleted successfully!");
          navigate("/admin/products");
        })
        .catch((error) => {
          console.error("Error deleting product!", error);
        });
    }
  };
  const handleEdit = () => {
    navigate(`/admin/products/edit/${id}`); // Navigate to the edit page
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the product details!", error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <div className="product-details-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image2"
        />
        <div className="product-info2">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>
            <strong>Category:</strong> {product.type}
          </p>
          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Rating:</strong> {product.rating}
          </p>
          <p>
            <strong>Reviews:</strong> {product.reviews}
          </p>
          <div className="product-buttons">
            
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
