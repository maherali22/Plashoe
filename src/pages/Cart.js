import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../hooks/CartContext";
import "./pagestyle/Cart.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import remove2 from "../components/Assets/remove2.gif";
const Cart = () => {
  const { cart, setCart,removeFromCart } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
      setCart(loggedInUser.cart || []);
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, [setCart, navigate]);

  const updateCartInDatabase = async (updatedCart) => {
    if (user) {
      try {
        const updatedUser = { ...user, cart: updatedCart };
        await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
        setCart(updatedCart);
      } catch (error) {
        console.error("Error updating cart in database:", error);
      }
    }
  };

  const handleIncreaseQty = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    updateCartInDatabase(updatedCart);
  };

  const handleDecreaseQty = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.qty > 1) {
        return { ...item, qty: item.qty - 1 };
      }
      return item;
    });
    updateCartInDatabase(updatedCart);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id); 
    
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 1000);
  };

  if (loading) return <p>Loading cart...</p>;
  if (!cart || cart.length === 0)
    return <h2 className="empty">Your cart is empty!</h2>;

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };
  const handlePayment = () => {
    navigate("/payment");
  };

  return (
    <div>
      <div className="cart-container2">
        <h2 className="cart-title">Your Cart</h2>
        <ul className="cart-items2">
          {cart.map((item) => (
            <li key={item.id} className="cart-item2">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image2"
              />
              <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-price">Price: ₹{item.price}</p>
                <p className="cart-item-price">
                  Total Price: ₹{item.price * item.qty}
                </p>
                <div className="cart-item-quantity">
                  <button
                    className="cart-btn cart-btn-decrement"
                    onClick={() => handleDecreaseQty(item.id)}
                  >
                    -
                  </button>
                  <span className="cart-item-qty">{item.qty}</span>
                  <button
                    className="cart-btn cart-btn-increment"
                    onClick={() => handleIncreaseQty(item.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="cart-btn cart-btn-remove"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-total">Total: ₹{calculateTotal()}</div>
        <button onClick={handlePayment}>Proceed To Checkout</button>
      </div>
      {showNotification && (
        <div className="notification-2">
          Product removed from cart
          <img className="remove" src={remove2} alt="remove" />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
