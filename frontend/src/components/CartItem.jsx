import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Plus, Minus, Trash2, Tag } from "lucide-react";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, lineTotal } = item;

  const hasBulkDiscount =
    product.bulkDiscount && quantity >= product.bulkDiscount.minQty;
  const discountAmount = hasBulkDiscount
    ? (lineTotal * product.bulkDiscount.discountPercent) / 100
    : 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr auto",
        gap: "1.25rem",
        padding: "1.25rem",
        backgroundColor: "#ffffff",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-light)",
        marginBottom: "1rem",
        alignItems: "center"
      }}
      id={`cart-item-${product.id}`}
    >
      {/* Thumbnail */}
      <Link to={`/products/${product.id}`} style={{ width: "100px", height: "85px", overflow: "hidden", borderRadius: "var(--radius-md)", backgroundColor: "#f1f5f9" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Link>

      {/* Info & Quantity controls */}
      <div>
        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>
          {product.brand} • {product.category}
        </div>
        <Link to={`/products/${product.id}`}>
          <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: "0.2rem 0 0.4rem" }}>
            {product.name}
          </h4>
        </Link>
        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.6rem" }}>
          Rate: <strong>₹{Number(product.price).toLocaleString("en-IN")}</strong> per {product.unit}
        </div>

        {hasBulkDiscount && (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.75rem",
            color: "var(--status-success)",
            backgroundColor: "var(--status-success-bg)",
            padding: "0.2rem 0.5rem",
            borderRadius: "4px",
            fontWeight: 600,
            marginBottom: "0.5rem"
          }}>
            <Tag size={12} />
            Bulk discount applied: {product.bulkDiscount.discountPercent}% OFF (-₹{discountAmount.toLocaleString("en-IN")})
          </div>
        )}

        {/* Stepper */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            style={{
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              border: "1px solid var(--border-medium)",
              backgroundColor: "#ffffff",
              cursor: "pointer"
            }}
            title="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span style={{ fontWeight: 700, fontSize: "0.95rem", minWidth: "40px", textAlign: "center" }}>
            {quantity}
          </span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            style={{
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              border: "1px solid var(--border-medium)",
              backgroundColor: "#ffffff",
              cursor: "pointer"
            }}
            title="Increase quantity"
          >
            <Plus size={14} />
          </button>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {product.unit}(s)
          </span>
        </div>
      </div>

      {/* Line Total & Remove */}
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
          ₹{Math.round(lineTotal - discountAmount).toLocaleString("en-IN")}
        </div>
        {hasBulkDiscount && (
          <div style={{ fontSize: "0.8rem", textDecoration: "line-through", color: "var(--text-muted)" }}>
            ₹{lineTotal.toLocaleString("en-IN")}
          </div>
        )}
        <button
          onClick={() => removeFromCart(product.id)}
          style={{
            background: "none",
            border: "none",
            color: "#ef4444",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            marginTop: "0.75rem"
          }}
          title="Remove from cart"
        >
          <Trash2 size={14} /> Remove
        </button>
      </div>
    </div>
  );
}
