import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.cart) {
      setCart(loggedInUser.cart);
    }
  }, []);

  const addToCart = async (product) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      console.error("User not logged in.");
      return;
    }

    const existingProduct = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, qty: 1 }];
    }

    setCart(updatedCart);

    try {
      const updatedUser = { ...loggedInUser, cart: updatedCart };
      await axios.put(
        `http://localhost:5000/users/${loggedInUser.id}`,
        updatedUser
      );

      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating the cart:", error);
    }
  };

  const removeFromCart = async (id) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      console.error("User not logged in.");
      return;
    }

    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);

    try {
      const updatedUser = { ...loggedInUser, cart: updatedCart };
      await axios.put(
        `http://localhost:5000/users/${loggedInUser.id}`,
        updatedUser
      );

      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
