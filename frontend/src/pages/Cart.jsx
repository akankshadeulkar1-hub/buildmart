import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { 
  ShoppingCart, 
  ArrowRight, 
  Trash2, 
  Truck, 
  ShieldCheck, 
  ArrowLeft,
  Tag
} from "lucide-react";

export default function Cart() {
  const { 
    cart, 
    clearCart, 
    subtotal, 
    discountAmount, 
    discountedSubtotal, 
    taxAmount, 
    totalItemsCount 
  } = useCart();
  const navigate = useNavigate();

  // Free delivery threshold: ₹50,000
  const freeDeliveryThreshold = 50000;
  const isFreeDelivery = discountedSubtotal >= freeDeliveryThreshold;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - discountedSubtotal);
  const deliveryProgressPercent = Math.min(100, Math.round((discountedSubtotal / freeDeliveryThreshold) * 100));

  const standardDeliveryFee = isFreeDelivery ? 0 : (cart.length > 0 ? 450 : 0);
  const grandTotal = Math.round(discountedSubtotal + taxAmount + standardDeliveryFee);

  if (cart.length === 0) {
    return (
      <div style={{ flex: 1, padding: "5rem 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "600px" }}>
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "var(--brand-primary-light)",
            color: "var(--brand-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem"
          }}>
            <ShoppingCart size={36} />
          </div>
          <h2 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>Your Material Cart is Empty</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", lineHeight: 1.6 }}>
            You haven't added any building materials, cement, or tools yet. Browse our yard inventory for direct site delivery rates.
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Browse Material Catalog <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, padding: "3rem 0 5rem" }}>
      <div className="container">
        {/* Title */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "2.25rem", margin: 0 }}>Project Materials Cart</h1>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>
              Review your items and schedule site unloading.
            </p>
          </div>
          <button
            onClick={clearCart}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.85rem",
              fontWeight: 600
            }}
          >
            <Trash2 size={15} /> Clear All Items
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "var(--radius-md)",
          padding: "1rem 1.25rem",
          border: "1px solid var(--border-light)",
          marginBottom: "2rem"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            <span style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Truck size={16} color="var(--brand-primary)" />
              {isFreeDelivery ? (
                <strong style={{ color: "var(--status-success)" }}>Congratulations! You have unlocked FREE Flatbed Site Delivery!</strong>
              ) : (
                <span>Add <strong>₹{remainingForFreeDelivery.toLocaleString("en-IN")}</strong> more to unlock <strong>FREE Flatbed Site Delivery</strong></span>
              )}
            </span>
            <span style={{ color: "var(--text-muted)" }}>{deliveryProgressPercent}%</span>
          </div>
          <div style={{ width: "100%", height: "8px", backgroundColor: "var(--bg-tertiary)", borderRadius: "9999px", overflow: "hidden" }}>
            <div style={{
              width: `${deliveryProgressPercent}%`,
              height: "100%",
              backgroundColor: isFreeDelivery ? "var(--status-success)" : "var(--brand-primary)",
              transition: "width 0.4s ease"
            }} />
          </div>
        </div>

        {/* Cart Layout Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "2.5rem", alignItems: "start" }}>
          {/* Left Column: Items */}
          <div>
            <div style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600 }}>
              {totalItemsCount} material unit(s) in order
            </div>
            {cart.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}

            <div style={{ marginTop: "1.5rem" }}>
              <Link to="/products" className="btn btn-secondary">
                <ArrowLeft size={16} /> Add More Materials
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)",
            padding: "2rem",
            boxShadow: "var(--shadow-sm)",
            position: "sticky",
            top: "90px"
          }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>
              Order Financial Summary
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.925rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Material Subtotal:</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--status-success)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Tag size={14} /> Bulk Tier Savings:
                  </span>
                  <span style={{ fontWeight: 700 }}>-₹{Math.round(discountAmount).toLocaleString("en-IN")}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>GST (5% Building Supplies):</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>₹{taxAmount.toLocaleString("en-IN")}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Standard Site Drop Delivery:</span>
                {isFreeDelivery ? (
                  <span style={{ fontWeight: 700, color: "var(--status-success)" }}>FREE</span>
                ) : (
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>₹{standardDeliveryFee.toLocaleString("en-IN")}</span>
                )}
              </div>

              <div style={{ height: "1px", backgroundColor: "var(--border-light)", margin: "0.5rem 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>Estimated Total:</span>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--brand-primary)", fontFamily: "var(--font-heading)" }}>
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Includes all applicable taxes & freight</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="btn btn-primary btn-lg"
              style={{ width: "100%", marginTop: "1.75rem" }}
              id="proceed-to-checkout"
            >
              Proceed to Site Checkout <ArrowRight size={18} />
            </button>

            {/* Guarantees */}
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <ShieldCheck size={14} color="var(--brand-accent)" /> 100% Quality Inspected before dispatch
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Truck size={14} color="var(--brand-accent)" /> Scheduled time-slot arrival with driver contact
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
