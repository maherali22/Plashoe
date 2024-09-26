import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/SideBar/Sidebar";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Collection from "./pages/Collection";
import Lookbook from "./pages/Lookbook";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Details from "./components/Details/Details";
import { CartProvider } from "./hooks/CartContext";
import { AuthProvider } from "./hooks/AuthContext";
import Payment from "./components/Payment/Payment";
import SearchResults from "./pages/Search";
/* Admin Page */
import AdminDashbord from "./adminpage/admindashbord";
import AdminLayout from "./adminpage/adminlayout";
import AdminProducts from "./adminpage/adminproducts";
import Logout from "./adminpage/adminlogout";
import AdminUsers from "./adminpage/adminusers";
import ProductDetails from "./adminpage/productdetails";
import ProductAdd from "./adminpage/ProductAdd";
import ProductEdit from "./adminpage/ProductEdit";
import UsersDetails from "./adminpage/UsersDetails";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Define the routes */}
            {/* Only render NavBar and Sidebar for non-admin routes */}
            <Route
              path="*"
              element={
                <>
                  <NavBar toggleSidebar={toggleSidebar} />
                  <Sidebar
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                  />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/men" element={<Men />} />
                    <Route path="/women" element={<Women />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/lookbook" element={<Lookbook />} />
                    <Route path="/product/:id" element={<Details />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/search" element={<SearchResults />} />
                  </Routes>
                </>
              }
            />
            {/* Admin Route */}

            <Route
              path="/admin"
              element={
                <AdminLayout>
                  <AdminDashbord />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminLayout>
                  <AdminUsers />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/users/:id"
              element={
                <AdminLayout>
                  <UsersDetails />
                </AdminLayout>
              }
            />
            <Route
              path="/logout"
              element={
                <AdminLayout>
                  <Logout />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/products/:id"
              element={
                <AdminLayout>
                  <ProductDetails />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/add"
              element={
                <AdminLayout>
                  <ProductAdd />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/products/edit/:id"
              element={
                <AdminLayout>
                  <ProductEdit />
                </AdminLayout>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
