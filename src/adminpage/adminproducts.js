import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminstyle/adminproducts.css"; 
import { useNavigate } from "react-router-dom";
function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [filterType, setFilterType] = useState("All");

  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/product") 
      .then((response) => {
        setProducts(response.data); 
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);
  const handleViewClick = (id) => {
    navigate(`/admin/products/${id}`); 
  };
  const handleNavAdd = () => {
    navigate("/admin/add");
  };
  
  const filteredProducts =
    filterType === "All"
      ? products
      : products.filter((product) => product.type === filterType);

  return (
    <div className="admin-products">
      <h2 className="admin-products-heading">Products</h2>
      <p className="admin-products-subheading">Manage products here</p>

      {/* Filter options */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filterType === "All" ? "active" : ""}`}
          onClick={() => setFilterType("All")}
        >
          All
        </button>
        <button
          className={`filter-btn ${filterType === "men" ? "active" : ""}`}
          onClick={() => setFilterType("men")}
        >
          Men
        </button>
        <button
          className={`filter-btn ${filterType === "women" ? "active" : ""}`}
          onClick={() => setFilterType("women")}
        >
          Women
        </button>
      </div>

      
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </td>

                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>₹{product.price}</td>
                <td>{product.brand}</td>
                <td>{product.rating}</td>
                <td>
                  <button
                    onClick={() => handleViewClick(product.id)}
                    className="view-btn"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="add-btn" onClick={handleNavAdd}>
        Add New +
      </button>
    </div>
  );
}

export default AdminProducts;
