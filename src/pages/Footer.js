import React from "react";
import "./pagestyle/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-column">
        <h2 className="footer-logo">PLASHOE</h2>
        <p>
          Praesent eget tortor sit risus egestas nulla pharetra ornare quis
          bibendum est bibendum sapien proin nascetur.
        </p>
      </div>

      <div className="footer-column">
        <h3>Shop</h3>
        <ul>
          <li>
            <a href="/men">Shop Men</a>
          </li>
          <li>
            <a href="/women">Shop Women</a>
          </li>
          <li>
            <a href="/lookbook">Lookbook</a>
          </li>
          <li>
            <a href="/collection">Collection</a>
          </li>
        </ul>
      </div>

      <div className="footer-column">
        <h3>About</h3>
        <ul>
          <li>
            <a href="/about/story">Our Story</a>
          </li>
          <li>
            <a href="/about/materials">Our Materials</a>
          </li>
          <li>
            <a href="/about/values">Our Value</a>
          </li>
          <li>
            <a href="/about/sustainability">Sustainability</a>
          </li>
          <li>
            <a href="/about/manufacture">Manufacture</a>
          </li>
        </ul>
      </div>

      <div className="footer-column">
        <h3>Need Help?</h3>
        <ul>
          <li>
            <a href="/faqs">FAQs</a>
          </li>
          <li>
            <a href="/shipping">Shipping & Returns</a>
          </li>
          <li>
            <a href="/shoe-care">Shoe Care</a>
          </li>
          <li>
            <a href="/size-chart">Size Chart</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
