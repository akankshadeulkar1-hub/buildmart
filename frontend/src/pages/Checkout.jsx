import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/api";
import { 
  Truck, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  HardHat,
  ArrowRight
} from "lucide-react";

export default function Checkout() {
  const { cart, clearCart, subtotal, discountAmount, discountedSubtotal, taxAmount } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [customer, setCustomer] = useState({
    fullName: "Rajesh V. Sharma",
    phone: "+91 98221 44556",
    email: "rajesh.contractor@sharmaconstruct.in"
  });

  const [shippingAddress, setShippingAddress] = useState({
    siteName: "Shree Ganesh Heights - Tower 2",
    street: "Plot 42, Wardha Road, Somalwada",
    city: "Nagpur",
    state: "Maharashtra",
    pincode: "440025",
    accessNotes: "Flatbed truck access available. Unloading gate clearance 14ft. Crane required for steel/tiles."
  });

  const [deliveryType, setDeliveryType] = useState("Flatbed Crane Unload");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Site Delivery");

  // Delivery options and fee rules
  const getDeliveryFee = () => {
    if (deliveryType === "Self Yard Pickup") return 0;
    if (discountedSubtotal >= 50000 && deliveryType === "Standard Site Drop") return 0;
    
    switch (deliveryType) {
      case "Flatbed Crane Unload":
        return 1200;
      case "Express Same-Day Tipper":
        return 1800;
      case "Standard Site Drop":
      default:
        return 450;
    }
  };

  const deliveryFee = getDeliveryFee();
  const grandTotal = Math.round(discountedSubtotal + taxAmount + deliveryFee);

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: "5rem 0", textAlign: "center" }}>
        <h2>No Items to Checkout</h2>
        <p style={{ color: "var(--text-secondary)", margin: "1rem 0 1.5rem" }}>
          Please add building materials to your cart before proceeding to checkout.
        </p>
        <Link to="/products" className="btn btn-primary">
          Browse Materials Catalog
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (!customer.fullName || !customer.phone) {
      setError("Please provide your contact name and site phone number.");
      return;
    }

    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.pincode) {
      setError("Please provide complete delivery site address details.");
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customer,
        shippingAddress,
        deliveryType,
        paymentMethod,
        items: cart.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          unit: item.product.unit,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image
        }))
      };

      const result = await createOrder(orderPayload);
      if (result && result.success) {
        clearCart();
        navigate(`/orders?newOrder=${result.order.id}`);
      } else {
        setError(result.message || "Failed to submit order. Please try again.");
      }
    } catch (err) {
      console.error("Order submission error:", err);
      setError(err.message || "Connection error. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, padding: "3rem 0 5rem" }}>
      <div className="container">
        <div style={{ marginBottom: "2rem" }}>
          <span className="badge badge-brand" style={{ marginBottom: "0.5rem" }}>
            Final Step
          </span>
          <h1 style={{ fontSize: "2.25rem", margin: 0 }}>Site Delivery & Procurement Checkout</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Enter project site delivery destination and select handling equipment requirements.
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: "#fef2f2",
            color: "#991b1b",
            border: "1px solid #fecaca",
            padding: "1rem",
            borderRadius: "var(--radius-md)",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "2.5rem", alignItems: "start" }}>
          {/* Left Column: Form Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Section 1: Customer Contact */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-light)",
              padding: "2rem"
            }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <User size={18} color="var(--brand-primary)" />
                Contractor / Site Manager Information
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="calc-input-group">
                  <label className="calc-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="calc-input"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  />
                </div>

                <div className="calc-input-group">
                  <label className="calc-label">Site Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    className="calc-input"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="calc-input-group">
                <label className="calc-label">Email Address (For Tax Invoices & Mill Certificates)</label>
                <input
                  type="email"
                  className="calc-input"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                />
              </div>
            </div>

            {/* Section 2: Construction Site Address */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-light)",
              padding: "2rem"
            }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <MapPin size={18} color="var(--brand-primary)" />
                Construction Site Destination
              </h3>

              <div className="calc-input-group">
                <label className="calc-label">Project / Site Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Horizon Tower 2 or Residence Plot 12"
                  className="calc-input"
                  value={shippingAddress.siteName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, siteName: e.target.value })}
                />
              </div>

              <div className="calc-input-group">
                <label className="calc-label">Site Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Plot number, cross street, landmark"
                  className="calc-input"
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div className="calc-input-group">
                  <label className="calc-label">City *</label>
                  <input
                    type="text"
                    required
                    className="calc-input"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  />
                </div>
                <div className="calc-input-group">
                  <label className="calc-label">State</label>
                  <input
                    type="text"
                    className="calc-input"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  />
                </div>
                <div className="calc-input-group">
                  <label className="calc-label">Pincode *</label>
                  <input
                    type="text"
                    required
                    className="calc-input"
                    value={shippingAddress.pincode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                  />
                </div>
              </div>

              <div className="calc-input-group" style={{ marginBottom: 0 }}>
                <label className="calc-label">Truck Access & Crane Unloading Notes</label>
                <textarea
                  rows="2"
                  placeholder="Mention gate clearance, underground wiring, or narrow lane restrictions..."
                  className="calc-input"
                  value={shippingAddress.accessNotes}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, accessNotes: e.target.value })}
                />
              </div>
            </div>

            {/* Section 3: Delivery Logistics Option */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-light)",
              padding: "2rem"
            }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Truck size={18} color="var(--brand-primary)" />
                Site Transport & Unloading Method
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem",
                  borderRadius: "var(--radius-md)",
                  border: `2px solid ${deliveryType === "Flatbed Crane Unload" ? "var(--brand-primary)" : "var(--border-light)"}`,
                  backgroundColor: deliveryType === "Flatbed Crane Unload" ? "var(--brand-primary-light)" : "#ffffff",
                  cursor: "pointer"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === "Flatbed Crane Unload"}
                      onChange={() => setDeliveryType("Flatbed Crane Unload")}
                      style={{ accentColor: "var(--brand-primary)" }}
                    />
                    <div>
                      <div style={{ fontWeight: 700 }}>Flatbed with Hydraulic Crane Unload</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        Recommended for cement pallets, heavy tile boxes, and structural steel bundles.
                      </div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 800, color: "var(--text-primary)" }}>₹1,200</span>
                </label>

                <label style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem",
                  borderRadius: "var(--radius-md)",
                  border: `2px solid ${deliveryType === "Standard Site Drop" ? "var(--brand-primary)" : "var(--border-light)"}`,
                  backgroundColor: deliveryType === "Standard Site Drop" ? "var(--brand-primary-light)" : "#ffffff",
                  cursor: "pointer"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === "Standard Site Drop"}
                      onChange={() => setDeliveryType("Standard Site Drop")}
                      style={{ accentColor: "var(--brand-primary)" }}
                    />
                    <div>
                      <div style={{ fontWeight: 700 }}>Standard Site Drop (Flatbed Tipper)</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        Delivered directly to site entrance gate within 24-48 hours.
                      </div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 800, color: "var(--text-primary)" }}>
                    {discountedSubtotal >= 50000 ? "FREE" : "₹450"}
                  </span>
                </label>

                <label style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem",
                  borderRadius: "var(--radius-md)",
                  border: `2px solid ${deliveryType === "Express Same-Day Tipper" ? "var(--brand-primary)" : "var(--border-light)"}`,
                  backgroundColor: deliveryType === "Express Same-Day Tipper" ? "var(--brand-primary-light)" : "#ffffff",
                  cursor: "pointer"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === "Express Same-Day Tipper"}
                      onChange={() => setDeliveryType("Express Same-Day Tipper")}
                      style={{ accentColor: "var(--brand-primary)" }}
                    />
                    <div>
                      <div style={{ fontWeight: 700 }}>Express Same-Day Tipper Dispatch</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        Urgent pour requirement? Immediate priority loading from BuildMart central yard.
                      </div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 800, color: "var(--text-primary)" }}>₹1,800</span>
                </label>
              </div>
            </div>

            {/* Section 4: Payment Terms */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-light)",
              padding: "2rem"
            }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CreditCard size={18} color="var(--brand-primary)" />
                Payment Method
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("Cash on Site Delivery")}
                  className={`btn ${paymentMethod === "Cash on Site Delivery" ? "btn-dark" : "btn-secondary"}`}
                  style={{ padding: "1rem 0.5rem", flexDirection: "column", height: "auto" }}
                >
                  <span style={{ fontWeight: 700 }}>Cash on Site Drop</span>
                  <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>Pay upon inspection</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("Bank NEFT / RTGS")}
                  className={`btn ${paymentMethod === "Bank NEFT / RTGS" ? "btn-dark" : "btn-secondary"}`}
                  style={{ padding: "1rem 0.5rem", flexDirection: "column", height: "auto" }}
                >
                  <span style={{ fontWeight: 700 }}>Bank NEFT / RTGS</span>
                  <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>Contractor Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("Card / UPI Online")}
                  className={`btn ${paymentMethod === "Card / UPI Online" ? "btn-dark" : "btn-secondary"}`}
                  style={{ padding: "1rem 0.5rem", flexDirection: "column", height: "auto" }}
                >
                  <span style={{ fontWeight: 700 }}>Card / UPI Portal</span>
                  <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>Instant Confirmation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary & Confirmation */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)",
            padding: "2rem",
            position: "sticky",
            top: "90px",
            boxShadow: "var(--shadow-sm)"
          }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "1.25rem" }}>
              Order Review
            </h3>

            {/* Quick List */}
            <div style={{ maxHeight: "240px", overflowY: "auto", marginBottom: "1.25rem", paddingRight: "0.5rem" }}>
              {cart.map(item => (
                <div key={item.product.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", fontSize: "0.85rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: "32px", height: "32px", borderRadius: "4px", objectFit: "cover" }} />
                    <div>
                      <div style={{ fontWeight: 600, maxWidth: "160px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.product.name}
                      </div>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                        {item.quantity} {item.product.unit} × ₹{item.product.price}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700 }}>₹{item.lineTotal.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Material Subtotal:</span>
                <span style={{ fontWeight: 600 }}>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--status-success)" }}>
                  <span>Bulk Savings:</span>
                  <span style={{ fontWeight: 700 }}>-₹{Math.round(discountAmount).toLocaleString("en-IN")}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>GST (5%):</span>
                <span style={{ fontWeight: 600 }}>₹{taxAmount.toLocaleString("en-IN")}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Site Freight ({deliveryType}):</span>
                <span style={{ fontWeight: 600 }}>
                  {deliveryFee === 0 ? <strong style={{ color: "var(--status-success)" }}>FREE</strong> : `₹${deliveryFee.toLocaleString("en-IN")}`}
                </span>
              </div>

              <div style={{ borderTop: "2px dashed var(--border-light)", paddingTop: "0.85rem", marginTop: "0.25rem", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 700, fontSize: "1rem" }}>Total Payable:</span>
                <span style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--brand-primary)", fontFamily: "var(--font-heading)" }}>
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: "100%", marginTop: "1.75rem" }}
              id="confirm-place-order"
            >
              {loading ? (
                "Allocating Yard Inventory..."
              ) : (
                <>
                  <CheckCircle2 size={18} /> Confirm & Dispatch Order
                </>
              )}
            </button>

            <div style={{ marginTop: "1.25rem", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
              By confirming, you agree to BuildMart site delivery access and unload policies.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
