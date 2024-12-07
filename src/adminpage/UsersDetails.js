import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./adminstyle/UsersDetails.css";
import user_icon2 from "../components/Assets/user_icon2.png";

const UsersDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isBlocked, setIsBlocked] = useState(false);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setIsBlocked(response.data.blocked);

        // Calculate total price for cart items
        const totalCart =
          response.data.cart?.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
          ) || 0;
        setTotalCartPrice(totalCart);
      })
      .catch((error) => {
        console.error("Error fetching user details!", error);
      });
  }, [id]);

  const handleBlockUnblock = () => {
    setIsBlocked(!isBlocked);
    axios
      .patch(`http://localhost:5000/users/${id}`, { blocked: !isBlocked })
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error updating user status:", error));
      
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-detail-container">
      <div className="user-info">
        <h2>{user.userId} Details</h2>
        <img src={user_icon2} alt="user" className="user-profile" />
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Full Name:</strong> {user.fullname}
        </p>
        <p>
          <strong>Gender:</strong> {user.gender}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <button className="block-btn" onClick={handleBlockUnblock}>
          {isBlocked ? "Unblock" : "Block"}
        </button>
      </div>

      {/* Ordered Items Section */}
      <div className="order-items">
        <h3>Ordered Items</h3>
        {user.orderedItems && user.orderedItems.length > 0 ? (
          user.orderedItems.map((order, index) => (
            <div key={index} className="order-card">
              <h4>Order #{index + 1}</h4>
              <p>
                <strong>Name:</strong>
                {order.paymentDetails.name}
              </p>
              <p>
                <strong>Email:</strong>
                {order.paymentDetails.email}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{order.totalAmount}
              </p>
              <p>
                <strong>Payment Method:</strong>
                {order.paymentDetails.paymentMethod}
              </p>
              <p>
                <strong>Shipping Address:</strong>
                {order.paymentDetails.address}
              </p>
              <p>
                <strong>Order Date:</strong>
                {new Date(order.date).toLocaleString()}
              </p>

              <div className="cart-grid">
                {order.items.map((item) => (
                  <div key={item.id} className="cart-card">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <h4>{item.name}</h4>
                    <p>
                      <strong>Price:</strong> ₹{item.price}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.qty}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <h2 style={{ textAlign: "center" }}>No orders placed yet</h2>
        )}
      </div>

      {/* Cart Items Section */}
      <div className="cart-items">
        <h3>Cart Items</h3>
        {user.cart && user.cart.length > 0 ? (
          <>
            <div className="cart-grid">
              {user.cart.map((item) => (
                <div key={item.id} className="cart-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <h4>{item.name}</h4>
                  <p>
                    <strong>Price:</strong> ₹{item.price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.qty}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{item.price * item.qty}
                  </p>
                </div>
              ))}
            </div>
            <h4>Total Cart Price: ₹{totalCartPrice}</h4>
          </>
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
    </div>
  );
};

export default UsersDetails;
