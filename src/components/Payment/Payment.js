import React, { useContext, useState } from "react";
import { CartContext } from "../../hooks/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const { cart, setCart } = useContext(CartContext);
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    paymentMethod: "Credit Card", // Default selection
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    // Validation
    if (Object.values(paymentDetails).some((field) => !field)) {
      alert("Please fill in all the details");
      return;
    }

    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      if (loggedInUser) {
        // Move cart items to orderedItems and empty the cart
        const updatedUser = {
          ...loggedInUser,
          cart: [], // Empty cart
          orderedItems: [
            // Append new order to the orderedItems
            ...(loggedInUser.orderedItems || []), // Keep existing orders
            {
              items: cart, // Current cart items
              totalAmount: calculateTotal(),
              paymentDetails, // Payment details for the order
              date: new Date().toISOString(), // Add the order date
            },
          ],
        };

        // Update user details in the database including empty cart and new order
        await axios.put(`http://localhost:5000/users/${loggedInUser.id}`, {
          ...updatedUser,
        });

        
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

        
        setCart([]);

        
        alert("Payment successful!");
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <form className="payment-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={paymentDetails.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={paymentDetails.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={paymentDetails.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={paymentDetails.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Expiration Date:
          <input
            type="text"
            name="expirationDate"
            value={paymentDetails.expirationDate}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </label>
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Payment Method:
          <select
            name="paymentMethod"
            value={paymentDetails.paymentMethod}
            onChange={handleChange}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </label>
        <button
          type="button"
          onClick={handlePayment}
          className="pay-now-button"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
