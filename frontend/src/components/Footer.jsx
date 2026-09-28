import React from "react";
import { Link } from "react-router-dom";
import { HardHat, Truck, ShieldCheck, Clock, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div style={{
                backgroundColor: "var(--brand-primary)",
                color: "#ffffff",
                padding: "0.4rem",
                borderRadius: "8px",
                display: "inline-flex"
              }}>
                <HardHat size={22} />
              </div>
              <h3 style={{ margin: 0, color: "#ffffff", fontFamily: "var(--font-heading)" }}>
                BUILD<span style={{ color: "var(--brand-primary)" }}>MART</span>
              </h3>
            </div>
            <p>
              Direct-from-yard wholesale & retail procurement for builders, civil contractors, structural engineers, and home renovators.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <MapPin size={15} color="var(--brand-primary)" /> Central Yard: MIDC Industrial Area, Nagpur
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Phone size={15} color="var(--brand-primary)" /> Dispatch Desk: +91 (0712) 289-4000
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Mail size={15} color="var(--brand-primary)" /> quotes@buildmart.internal
              </span>
            </div>
          </div>

          {/* Col 2: Core Materials */}
          <div className="footer-col">
            <h4>Primary Materials</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=Cement+%26+Concrete" className="footer-link">Portland & PPC Cement</Link></li>
              <li><Link to="/products?category=Steel+%26+Structural" className="footer-link">TMT Steel 550D Rebars</Link></li>
              <li><Link to="/products?category=Aggregates+%26+Sand" className="footer-link">River Sand & 20mm Metal</Link></li>
              <li><Link to="/products?category=Bricks+%26+Masonry" className="footer-link">Red Kiln Clay Bricks</Link></li>
              <li><Link to="/products?category=Tiles+%26+Flooring" className="footer-link">Vitrified Floor Tiles</Link></li>
            </ul>
          </div>

          {/* Col 3: Yard Logistics */}
          <div className="footer-col">
            <h4>Site Logistics</h4>
            <ul className="footer-links">
              <li style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}><Truck size={14} color="var(--brand-accent)" /> Flatbed Tipper Delivery</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}><ShieldCheck size={14} color="var(--brand-accent)" /> Crane Hydraulic Unloading</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}><Clock size={14} color="var(--brand-accent)" /> 24-Hour Express Turnaround</li>
              <li><Link to="/orders" className="footer-link">Live GPS Truck Tracking</Link></li>
              <li><a href="#calculator" className="footer-link">Material Volume Estimator</a></li>
            </ul>
          </div>

          {/* Col 4: Contractor Accounts */}
          <div className="footer-col">
            <h4>Contractor Desk</h4>
            <p style={{ fontSize: "0.85rem", marginBottom: "0.85rem" }}>
              Are you an institutional developer or structural contractor? Open a 30-day billing line with volume discounts.
            </p>
            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              padding: "0.85rem",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <span style={{ fontSize: "0.8rem", color: "var(--brand-accent)", fontWeight: 700 }}>
                CERTIFIED QUALITY
              </span>
              <p style={{ fontSize: "0.75rem", margin: "0.25rem 0 0", color: "#cbd5e1" }}>
                100% BIS / IS Standard Compliant with mill test certificates on request.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} BuildMart Industrial Supply Ltd. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Privacy Policy</span>
            <span>Terms of Procurement</span>
            <span>Safety Datasheets (MSDS)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
