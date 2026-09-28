import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, Grid, Building2, ArrowRight, RefreshCw } from "lucide-react";

export default function MaterialCalculator() {
  const [activeTab, setActiveTab] = useState("tiles"); // "tiles" or "concrete"

  // Tiles calculator state
  const [roomLength, setRoomLength] = useState(20);
  const [roomWidth, setRoomWidth] = useState(15);
  const [boxCoverage, setBoxCoverage] = useState(15.5); // standard 2x4 ft tile box coverage
  const [wastagePercent, setWastagePercent] = useState(10);

  // Concrete calculator state
  const [slabLength, setSlabLength] = useState(30);
  const [slabWidth, setSlabWidth] = useState(20);
  const [slabThickness, setSlabThickness] = useState(5); // inches

  // Calculations for Tiles
  const rawFloorArea = Number(roomLength) * Number(roomWidth);
  const totalFloorAreaWithBuffer = Math.ceil(rawFloorArea * (1 + Number(wastagePercent) / 100));
  const boxesNeeded = Math.ceil(totalFloorAreaWithBuffer / (Number(boxCoverage) || 15.5));
  const estimatedTileCost = totalFloorAreaWithBuffer * 78; // average ₹78 / sq.ft

  // Calculations for Concrete (M20 nominal mix standard 1:1.5:3)
  // Volume in cu.ft = L (ft) * W (ft) * (Thickness in inches / 12)
  const wetVolumeCuFt = Number(slabLength) * Number(slabWidth) * (Number(slabThickness) / 12);
  const wetVolumeCuM = wetVolumeCuFt * 0.0283168;
  const dryVolumeCuM = wetVolumeCuM * 1.54; // standard 54% bulking factor
  // Total parts in 1:1.5:3 = 5.5
  // Cement volume = dryVolume / 5.5
  const cementBags = Math.ceil((dryVolumeCuM / 5.5) * 28.8); // 28.8 bags per cu.m of cement
  const sandTons = ((dryVolumeCuM * 1.5) / 5.5 * 1.6).toFixed(1); // 1.6 density
  const aggregateTons = ((dryVolumeCuM * 3.0) / 5.5 * 1.55).toFixed(1);

  return (
    <div className="calculator-box" id="calculator">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span className="badge badge-brand" style={{ marginBottom: "0.5rem" }}>
            Contractor Utility
          </span>
          <h2 style={{ fontSize: "1.75rem", margin: "0.25rem 0" }}>
            Smart Material Quantity Estimator
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.925rem" }}>
            Eliminate site shortage and wastage. Compute exact cement bags, steel tons, and tile boxes with precision.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", backgroundColor: "var(--bg-tertiary)", padding: "0.3rem", borderRadius: "var(--radius-md)" }}>
          <button
            className={`btn btn-sm ${activeTab === "tiles" ? "btn-dark" : "btn-secondary"}`}
            onClick={() => setActiveTab("tiles")}
            style={{ border: "none" }}
          >
            <Grid size={15} /> Tile & Flooring
          </button>
          <button
            className={`btn btn-sm ${activeTab === "concrete" ? "btn-dark" : "btn-secondary"}`}
            onClick={() => setActiveTab("concrete")}
            style={{ border: "none" }}
          >
            <Building2 size={15} /> Concrete Slab (M20)
          </button>
        </div>
      </div>

      {activeTab === "tiles" ? (
        <div className="calc-grid">
          {/* Inputs */}
          <div>
            <h4 style={{ marginBottom: "1rem", color: "var(--brand-primary)" }}>Room Dimensions (Feet)</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="calc-input-group">
                <label className="calc-label">Room Length (ft)</label>
                <input
                  type="number"
                  className="calc-input"
                  value={roomLength}
                  onChange={(e) => setRoomLength(e.target.value)}
                  min="1"
                />
              </div>
              <div className="calc-input-group">
                <label className="calc-label">Room Width (ft)</label>
                <input
                  type="number"
                  className="calc-input"
                  value={roomWidth}
                  onChange={(e) => setRoomWidth(e.target.value)}
                  min="1"
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="calc-input-group">
                <label className="calc-label">Box Coverage (sq.ft / box)</label>
                <input
                  type="number"
                  className="calc-input"
                  value={boxCoverage}
                  onChange={(e) => setBoxCoverage(e.target.value)}
                  min="1"
                  step="0.5"
                />
              </div>
              <div className="calc-input-group">
                <label className="calc-label">Wastage / Cutting Allowance (%)</label>
                <select
                  className="calc-input"
                  value={wastagePercent}
                  onChange={(e) => setWastagePercent(e.target.value)}
                >
                  <option value="5">5% (Simple Rectangular)</option>
                  <option value="10">10% (Recommended Standard)</option>
                  <option value="15">15% (Diagonal / Complex Corners)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="calc-results-box">
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--brand-accent)", fontWeight: 700, textTransform: "uppercase" }}>
                Estimated Requirements
              </span>
              <h3 style={{ color: "#ffffff", fontSize: "1.4rem", marginTop: "0.25rem" }}>
                {boxesNeeded} Boxes of Tiles
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                Based on net area {rawFloorArea} sq.ft + {wastagePercent}% cutting buffer.
              </p>
            </div>

            <div className="calc-results-grid">
              <div className="calc-res-item">
                <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Total Gross Area</div>
                <div className="calc-res-val">{totalFloorAreaWithBuffer} <span style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>sq.ft</span></div>
              </div>
              <div className="calc-res-item">
                <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Approx. Tile Material Cost</div>
                <div className="calc-res-val">₹{estimatedTileCost.toLocaleString("en-IN")}</div>
              </div>
            </div>

            <Link to="/products?category=Tiles+%26+Flooring" className="btn btn-primary" style={{ width: "100%" }}>
              Browse Vitrified Floor Tiles <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="calc-grid">
          {/* Concrete Inputs */}
          <div>
            <h4 style={{ marginBottom: "1rem", color: "var(--brand-primary)" }}>Slab Specifications</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="calc-input-group">
                <label className="calc-label">Slab Length (ft)</label>
                <input
                  type="number"
                  className="calc-input"
                  value={slabLength}
                  onChange={(e) => setSlabLength(e.target.value)}
                  min="1"
                />
              </div>
              <div className="calc-input-group">
                <label className="calc-label">Slab Width (ft)</label>
                <input
                  type="number"
                  className="calc-input"
                  value={slabWidth}
                  onChange={(e) => setSlabWidth(e.target.value)}
                  min="1"
                />
              </div>
            </div>

            <div className="calc-input-group">
              <label className="calc-label">Slab Thickness (inches)</label>
              <input
                type="number"
                className="calc-input"
                value={slabThickness}
                onChange={(e) => setSlabThickness(e.target.value)}
                min="3"
                max="24"
              />
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
                Typical residential roof slab thickness is 5 to 6 inches.
              </span>
            </div>
          </div>

          {/* Results Display */}
          <div className="calc-results-box">
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--brand-accent)", fontWeight: 700, textTransform: "uppercase" }}>
                M20 Mix Ratio (1 Cement : 1.5 Sand : 3 Aggregates)
              </span>
              <h3 style={{ color: "#ffffff", fontSize: "1.4rem", marginTop: "0.25rem" }}>
                {cementBags} Cement Bags (50kg)
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                Total concrete volume: {wetVolumeCuFt.toFixed(0)} cu.ft ({wetVolumeCuM.toFixed(1)} m³)
              </p>
            </div>

            <div className="calc-results-grid">
              <div className="calc-res-item">
                <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>River Sand Required</div>
                <div className="calc-res-val">{sandTons} <span style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>Tons</span></div>
              </div>
              <div className="calc-res-item">
                <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>20mm Aggregates</div>
                <div className="calc-res-val">{aggregateTons} <span style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>Tons</span></div>
              </div>
            </div>

            <Link to="/products?category=Cement+%26+Concrete" className="btn btn-primary" style={{ width: "100%" }}>
              Order Structural Cement Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
