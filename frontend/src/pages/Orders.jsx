import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { fetchOrders } from "../services/api";
import OrderStatus from "../components/OrderStatus";
import { PackageCheck, Search, CheckCircle2, ArrowRight, HardHat, RefreshCw } from "lucide-react";

export default function Orders() {
  const [searchParams] = useSearchParams();
  const newOrderId = searchParams.get("newOrder");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(newOrderId || "");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetchOrders();
      if (res && res.orders) {
        setOrders(res.orders);
      }
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = !searchTerm ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      order.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      order.shippingAddress.siteName.toLowerCase().includes(searchTerm.toLowerCase().trim());

    if (!matchesSearch) return false;

    if (statusFilter === "active") {
      return !order.orderStatus.toLowerCase().includes("delivered");
    } else if (statusFilter === "delivered") {
      return order.orderStatus.toLowerCase().includes("delivered");
    }

    return true;
  });

  return (
    <div style={{ flex: 1, padding: "3rem 0 5rem" }}>
      <div className="container">
        {/* New Order Success Banner */}
        {newOrderId && (
          <div style={{
            background: "linear-gradient(135deg, #166534 0%, #15803d 100%)",
            color: "#ffffff",
            borderRadius: "var(--radius-xl)",
            padding: "2rem",
            marginBottom: "2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "var(--shadow-lg)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", padding: "0.75rem", borderRadius: "50%" }}>
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h2 style={{ color: "#ffffff", fontSize: "1.5rem", margin: 0 }}>
                  Order Confirmed & Sent to Yard Dispatch!
                </h2>
                <p style={{ color: "#dcfce7", margin: "0.25rem 0 0", fontSize: "0.95rem" }}>
                  Your order <strong>#{newOrderId}</strong> has been logged. Stock has been allocated from BuildMart central yard.
                </p>
              </div>
            </div>
            <a href={`#tracking-${newOrderId}`} className="btn btn-secondary btn-sm" style={{ backgroundColor: "#ffffff", color: "#166534" }}>
              View Tracking Below ↓
            </a>
          </div>
        )}

        {/* Page Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span className="badge badge-brand" style={{ marginBottom: "0.5rem" }}>
              Logistics Dispatch Tracker
            </span>
            <h1 style={{ fontSize: "2.25rem", margin: 0 }}>
              Live Order Fulfillment & Site Drops
            </h1>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>
              Track vehicle status, carrier contact, crane requirements, and delivery milestones.
            </p>
          </div>

          <button
            onClick={loadOrders}
            className="btn btn-secondary"
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <RefreshCw size={15} /> Refresh Status
          </button>
        </div>

        {/* Filter Controls */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-light)",
          padding: "1rem 1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          {/* Search by Order ID or Site */}
          <div style={{ position: "relative", minWidth: "300px" }}>
            <Search size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search by Order ID (e.g. BM-ORD-...), site or contractor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.85rem 0.5rem 2.4rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-medium)",
                fontSize: "0.875rem",
                outline: "none"
              }}
            />
          </div>

          {/* Status Tabs */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setStatusFilter("all")}
              className={`btn btn-sm ${statusFilter === "all" ? "btn-dark" : "btn-secondary"}`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setStatusFilter("active")}
              className={`btn btn-sm ${statusFilter === "active" ? "btn-dark" : "btn-secondary"}`}
            >
              Active / In Transit ({orders.filter(o => !o.orderStatus.toLowerCase().includes("delivered")).length})
            </button>
            <button
              onClick={() => setStatusFilter("delivered")}
              className={`btn btn-sm ${statusFilter === "delivered" ? "btn-dark" : "btn-secondary"}`}
            >
              Delivered ({orders.filter(o => o.orderStatus.toLowerCase().includes("delivered")).length})
            </button>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "var(--text-muted)" }}>
            Loading site dispatch orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "5rem 2rem",
            backgroundColor: "#ffffff",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)"
          }}>
            <PackageCheck size={48} style={{ color: "var(--text-muted)", margin: "0 auto 1rem" }} />
            <h3 style={{ fontSize: "1.35rem", marginBottom: "0.5rem" }}>No orders matching search</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Check your search query or place a new material order from our catalog.
            </p>
            <Link to="/products" className="btn btn-primary">
              Browse Materials <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div>
            {filteredOrders.map(order => (
              <OrderStatus
                key={order.id}
                order={order}
                onStatusUpdated={loadOrders}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
