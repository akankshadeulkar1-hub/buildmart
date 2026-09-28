import React from "react";
import { useCart } from "../context/CartContext";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

export default function Toast() {
  const { toasts } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast" id={`toast-${toast.id}`}>
          {toast.type === "success" ? (
            <CheckCircle2 size={18} color="var(--status-success)" />
          ) : toast.type === "warning" ? (
            <AlertTriangle size={18} color="var(--status-warning)" />
          ) : (
            <Info size={18} color="var(--status-info)" />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
