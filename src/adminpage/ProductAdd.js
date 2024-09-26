import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./adminstyle/ProductAdd.css";

const ProductAdd = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    type: "",
    price: "",
    brand: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/product", newProduct)
      .then(() => {
        alert("Product added successfully!");
        navigate("/admin/products");
      })
      .catch((error) => {
        console.error("Error adding product!", error);
      });
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <p></p>
        <input
          type="text"
          name="type"
          value={newProduct.type}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="brand"
          value={newProduct.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
        />
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
