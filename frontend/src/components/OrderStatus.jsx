import React, { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Truck, 
  MapPin, 
  Calendar, 
  Phone, 
  Clock, 
  AlertCircle,
  HardHat,
  ArrowRight
} from "lucide-react";
import { updateOrderStatus } from "../services/api";

export default function OrderStatus({ order, onStatusUpdated }) {
  const [updating, setUpdating] = useState(false);

  const steps = [
    "Order Placed",
    "Confirmed & Yard Assigned",
    "Dispatched",
    "Out for Delivery",
    "Delivered & Signed"
  ];

  const getStepStatus = (stepName) => {
    const found = order.timeline?.find(t => t.status.toLowerCase().includes(stepName.toLowerCase()));
    if (found && found.completed) return "completed";
    if (order.orderStatus.toLowerCase().includes(stepName.toLowerCase())) return "active";
    return "pending";
  };

  const advanceNextStatus = async () => {
    const currentIdx = steps.findIndex(s => s.toLowerCase().includes(order.orderStatus.toLowerCase()));
    if (currentIdx < steps.length - 1) {
      const nextStatus = steps[currentIdx + 1];
      setUpdating(true);
      try {
        await updateOrderStatus(order.id, nextStatus, `Updated via BuildMart tracking system`);
        if (onStatusUpdated) onStatusUpdated();
      } catch (e) {
        console.error("Failed to advance status", e);
      } finally {
        setUpdating(false);
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Delivered & Signed":
      case "Delivered":
        return "badge-success";
      case "Out for Delivery":
      case "Dispatched":
        return "badge-warning";
      case "Confirmed":
      case "Confirmed & Yard Assigned":
        return "badge-info";
      default:
        return "badge-brand";
    }
  };

  return (
    <div className="order-tracking-card" id={`tracking-${order.id}`}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
            <h3 style={{ fontSize: "1.25rem", margin: 0 }}>
              Order #{order.id}
            </h3>
            <span className={`badge ${getStatusBadgeClass(order.orderStatus)}`}>
              {order.orderStatus}
            </span>
          </div>
          <div style={{ fontSize: "0.825rem", color: "var(--text-secondary)", display: "flex", gap: "1rem" }}>
            <span>Placed: {new Date(order.createdAt).toLocaleString()}</span>
            <span>Delivery Type: <strong>{order.deliveryType}</strong></span>
          </div>
        </div>

        {/* Action Button for Demo Progression */}
        {order.orderStatus !== "Delivered & Signed" && (
          <button
            onClick={advanceNextStatus}
            disabled={updating}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: "0.8rem" }}
          >
            <Truck size={14} />
            {updating ? "Updating..." : "Simulate Next Stage →"}
          </button>
        )}
      </div>

      {/* Visual Stepper */}
      <div className="timeline-stepper">
        {steps.map((step, idx) => {
          const status = getStepStatus(step);
          const timelineItem = order.timeline?.find(t => t.status.toLowerCase().includes(step.toLowerCase()));

          return (
            <div
              key={step}
              className={`timeline-step ${status}`}
            >
              <div className="step-circle">
                {status === "completed" ? (
                  <CheckCircle2 size={20} />
                ) : status === "active" ? (
                  <Truck size={18} />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <div className="step-label">{step}</div>
              {timelineItem?.timestamp && (
                <div className="step-time">
                  {new Date(timelineItem.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Site Delivery & Notes */}
      <div style={{
        marginTop: "1.5rem",
        padding: "1rem",
        backgroundColor: "var(--bg-tertiary)",
        borderRadius: "var(--radius-md)",
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr",
        gap: "1.25rem",
        fontSize: "0.85rem"
      }}>
        <div>
          <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
            <MapPin size={15} color="var(--brand-primary)" /> Destination Construction Site:
          </div>
          <div style={{ color: "var(--text-secondary)" }}>
            <strong>{order.shippingAddress.siteName}</strong><br />
            {order.shippingAddress.street}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
          </div>
          {order.shippingAddress.accessNotes && (
            <div style={{ marginTop: "0.4rem", color: "#b45309", fontSize: "0.8rem", fontWeight: 600 }}>
              ⚠️ Access note: {order.shippingAddress.accessNotes}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
            <HardHat size={15} color="var(--brand-primary)" /> Site Receiver:
          </div>
          <div style={{ color: "var(--text-secondary)" }}>
            <strong>{order.customer.fullName}</strong><br />
            Phone: {order.customer.phone}<br />
            Payment: {order.paymentMethod} ({order.paymentStatus})
          </div>
        </div>
      </div>

      {/* Ordered Items Preview */}
      <div style={{ marginTop: "1.25rem" }}>
        <h4 style={{ fontSize: "0.9rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
          Dispatched Materials ({order.items?.length} items)
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {order.items?.map((it, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.75rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-light)",
                backgroundColor: "#ffffff",
                fontSize: "0.825rem"
              }}
            >
              <img
                src={it.image}
                alt={it.name}
                style={{ width: "28px", height: "28px", objectFit: "cover", borderRadius: "4px" }}
              />
              <span>
                <strong>{it.quantity} {it.unit}</strong> • {it.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
