import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  // Get the search query from URL
  const searchQuery = new URLSearchParams(location.search)
    .get("q")
    .toLowerCase();

  useEffect(() => {
    // Fetch products based on the search query
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/product?q=${searchQuery}`
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <div className="search-results-container">
      <h2>Search Results for "{searchQuery}"</h2>
      <div className="product-grid">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </Link>

              <h3>{product.name}</h3>

              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>
              <p>
                <strong>Categorie:</strong> {product.rating}
              </p>
              <p>
                <strong>Rating:</strong> {product.rating}
              </p>
              <p>
                <strong>Reviews:</strong> {product.reviews}
              </p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
