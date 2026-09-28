import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Star, ShoppingCart, Check, Info, ShieldAlert } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80";

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const qty = product.moq ? Math.max(1, product.moq) : 1;
    addToCart(product, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="product-card" id={`product-${product.id}`}>
      {/* Image & Badges */}
      <Link to={`/products/${product.id}`} className="product-card-image-box">
        <img
          src={imgError ? fallbackImage : product.image}
          alt={product.name}
          className="product-card-image"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        {product.badge && (
          <div className="product-badge-overlay">
            <span className="badge badge-brand">{product.badge}</span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="product-card-content">
        <div className="product-category-sub">
          {product.brand} • {product.category}
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="product-name" title={product.name}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="product-rating-box">
          <div style={{ display: "flex", color: "#f59e0b", alignItems: "center" }}>
            <Star size={14} fill="#f59e0b" />
          </div>
          <span style={{ color: "var(--text-primary)" }}>{product.rating}</span>
          <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
            ({product.reviewsCount} reviews)
          </span>
        </div>

        {/* MOQ & Bulk Info */}
        <div className="product-moq-info">
          <span>Min. Order: <strong>{product.moq || 1} {product.unit}</strong></span>
          {product.bulkDiscount ? (
            <span style={{ color: "var(--brand-primary)", fontWeight: 600 }}>
              {product.bulkDiscount.discountPercent}% off @ {product.bulkDiscount.minQty}+
            </span>
          ) : (
            <span style={{ color: "var(--status-success)", fontWeight: 600 }}>In Stock</span>
          )}
        </div>

        {/* Price & Unit */}
        <div className="product-price-section">
          <span className="price-currency">₹</span>
          <span className="price-val">{Number(product.price).toLocaleString("en-IN")}</span>
          <span className="price-unit">/ {product.unit}</span>
        </div>

        {/* Action Buttons */}
        <div className="product-card-footer">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-secondary btn-sm"
            style={{ flex: 1 }}
          >
            <Info size={14} /> Specs
          </Link>
          <button
            onClick={handleAdd}
            className="btn btn-primary btn-sm"
            style={{ flex: 1.5 }}
            id={`add-to-cart-${product.id}`}
          >
            {isAdded ? (
              <>
                <Check size={14} /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={14} /> Add {product.moq > 1 ? `(${product.moq})` : ""}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
