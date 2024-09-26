import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./adminstyle/ProductEdit.css";

const ProductEdit = () => {
  const { id } = useParams(); // Get the product ID from URL params
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    type: "",
    price: "",
    brand: "",
    rating: "",
    reviews: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data!", error);
      });
  }, [id]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/product/${id}`, product)
      .then(() => {
        alert("Product updated successfully!");
        navigate("/admin/products"); 
      })
      .catch((error) => {
        console.error("Error updating product!", error);
      });
  };

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="type"
            value={product.type}
            onChange={handleChange}
            placeholder="Category"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Brand"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            placeholder="Rating"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="reviews"
            value={product.reviews}
            onChange={handleChange}
            placeholder="Reviews"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
