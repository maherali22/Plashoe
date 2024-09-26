import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();
// user details
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Login function
  const loginUser = (user) => {
    setUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  // Logout function
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
