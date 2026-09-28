import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { 
  HardHat, 
  ShoppingCart, 
  Search, 
  Phone, 
  Clock, 
  Calculator, 
  PackageCheck, 
  Layers
} from "lucide-react";

export default function Navbar() {
  const { totalItemsCount } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/products");
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <header className="navbar">
      {/* Top Bar for Contractors */}
      <div className="navbar-top">
        <div className="container navbar-top-content">
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Phone size={13} style={{ color: "var(--brand-primary)" }} />
              Contractor Support: <strong>+91 (0712) 289-4000</strong>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Clock size={13} />
              Yard Dispatch Hours: Mon - Sat 6:00 AM - 8:00 PM
            </span>
          </div>
          <div>
            <span>⚡ Direct Yard Delivery & Flatbed Crane Unload Available</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar-main">
        <div className="container navbar-container">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo">
            <div style={{
              backgroundColor: "var(--brand-primary)",
              color: "#ffffff",
              padding: "0.45rem",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <HardHat size={26} />
            </div>
            <div>
              BUILD<span>MART</span>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--text-muted)", marginTop: "-4px" }}>
                HEAVY BUILDING SUPPLIES
              </div>
            </div>
          </Link>

          {/* Search Form */}
          <form className="search-bar-wrapper" onSubmit={handleSearchSubmit}>
            <Search className="search-bar-icon" size={18} />
            <input
              type="text"
              className="search-bar-input"
              placeholder="Search cement, TMT steel, river sand, bricks, tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          {/* Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/" className={isActive("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className={isActive("/products")}>
                  <Layers size={16} /> Catalog
                </Link>
              </li>
              <li>
                <Link to="/orders" className={isActive("/orders")}>
                  <PackageCheck size={16} /> Track Orders
                </Link>
              </li>
              <li>
                <Link to="/cart" className="cart-btn-link">
                  <ShoppingCart size={18} />
                  <span>Cart</span>
                  {totalItemsCount > 0 && (
                    <span className="cart-badge-count">{totalItemsCount}</span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
