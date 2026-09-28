import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../services/api";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import MaterialCalculator from "../components/MaterialCalculator";
import { 
  Truck, 
  ShieldCheck, 
  Clock, 
  Award, 
  ArrowRight, 
  Search, 
  HardHat, 
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [heroSearch, setHeroSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        if (prodRes && prodRes.products) setProducts(prodRes.products);
        if (catRes && catRes.categories) setCategories(catRes.categories);
      } catch (err) {
        console.error("Failed to load home data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate("/products");
    }
  };

  const displayedProducts = selectedCategory === "All"
    ? products.slice(0, 8)
    : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase()).slice(0, 8);

  return (
    <div style={{ flex: 1 }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(234, 88, 12, 0.2)",
              border: "1px solid rgba(234, 88, 12, 0.4)",
              color: "#fb923c",
              padding: "0.35rem 0.85rem",
              borderRadius: "9999px",
              fontSize: "0.85rem",
              fontWeight: 700,
              marginBottom: "1.25rem"
            }}>
              <Sparkles size={15} /> DIRECT FROM YARD WHOLESALE SUPPLY
            </div>

            <h1 className="hero-title">
              Heavy Building Supplies, Delivered <span>Direct To Site</span>.
            </h1>

            <p className="hero-subtitle">
              Cement, TMT structural steel, kiln bricks, river sand, and industrial power tools. Engineered for developers, civil contractors, and home builders with scheduled crane unloading.
            </p>

            {/* Hero Search Box */}
            <form onSubmit={handleHeroSearch} style={{ display: "flex", gap: "0.5rem", maxWidth: "520px", marginBottom: "1.5rem" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="text"
                  placeholder="What materials do you need for your site today?"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem 0.85rem 2.75rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    fontSize: "0.95rem",
                    outline: "none"
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.85rem 1.5rem" }}>
                Find Stock
              </button>
            </form>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link to="/products" className="btn btn-primary btn-lg">
                Explore Full Catalog <ArrowRight size={18} />
              </Link>
              <a href="#calculator" className="btn btn-secondary btn-lg" style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#ffffff", borderColor: "rgba(255,255,255,0.2)" }}>
                Calculate Materials
              </a>
            </div>

            {/* Live Stats */}
            <div className="hero-stats">
              <div className="hero-stat-item">
                <h3>45,000+</h3>
                <p>Tons Delivered to Sites</p>
              </div>
              <div className="hero-stat-item">
                <h3>99.4%</h3>
                <p>On-Time Flatbed Dispatch</p>
              </div>
              <div className="hero-stat-item">
                <h3>100%</h3>
                <p>BIS Certified Quality</p>
              </div>
            </div>
          </div>

          {/* Hero Side Card */}
          <div className="hero-card-preview">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span className="badge badge-brand">Contractor Daily Specials</span>
              <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Live Yard Inventory</span>
            </div>

            <h3 style={{ color: "#ffffff", fontSize: "1.35rem", marginBottom: "0.5rem" }}>
              Tata Tiscon 550D TMT Steel
            </h3>
            <p style={{ color: "#cbd5e1", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              Primary structural steel rods with high ductility. Direct mill dispatch available in 10-ton tipper trucks.
            </p>

            <div style={{
              background: "rgba(0, 0, 0, 0.3)",
              padding: "1rem",
              borderRadius: "var(--radius-md)",
              marginBottom: "1.25rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Current Yard Rate</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--brand-accent)", fontFamily: "var(--font-heading)" }}>
                  ₹68,500 <span style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>/ ton</span>
                </div>
              </div>
              <span className="badge badge-success">45 Tons In Stock</span>
            </div>

            <Link to="/products/prod-002" className="btn btn-primary" style={{ width: "100%" }}>
              View Specifications & Order <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-bar">
        <div className="container trust-grid">
          <div className="trust-item">
            <div className="trust-icon-box">
              <Truck size={22} />
            </div>
            <div className="trust-text">
              <h4>Direct Site Logistics</h4>
              <p>Flatbed trucks with hydraulic crane unload</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <Award size={22} />
            </div>
            <div className="trust-text">
              <h4>100% Certified Grades</h4>
              <p>BIS & IS compliance certificates included</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <Clock size={22} />
            </div>
            <div className="trust-text">
              <h4>24-Hour Dispatch</h4>
              <p>Guaranteed site drop for in-stock orders</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <ShieldCheck size={22} />
            </div>
            <div className="trust-text">
              <h4>Bulk Contractor Pricing</h4>
              <p>Tiered discounts for site project volumes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter & Catalog Preview */}
      <section style={{ padding: "4rem 0 2rem" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className="badge badge-brand" style={{ marginBottom: "0.5rem" }}>
                Primary Materials
              </span>
              <h2 style={{ fontSize: "2rem" }}>Browse Building Materials</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Filter by material category to view live yard rates and available tonnage.
              </p>
            </div>
            <Link to="/products" className="btn btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              View All Materials ({products.length}) <ArrowRight size={16} />
            </Link>
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {loading ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}>
              Loading materials from BuildMart Yard...
            </div>
          ) : (
            <div className="product-grid">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Material Quantity Estimator */}
      <section className="container">
        <MaterialCalculator />
      </section>

      {/* Contractor Account CTA */}
      <section style={{ padding: "3rem 0 5rem" }}>
        <div className="container">
          <div style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            color: "#ffffff",
            borderRadius: "var(--radius-xl)",
            padding: "3.5rem",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "2.5rem",
            alignItems: "center"
          }}>
            <div>
              <span className="badge badge-brand" style={{ marginBottom: "0.75rem" }}>
                For General Contractors & Developers
              </span>
              <h2 style={{ color: "#ffffff", fontSize: "2.25rem", marginBottom: "1rem" }}>
                Managing Multi-Storey Commercial or Residential Projects?
              </h2>
              <p style={{ color: "#cbd5e1", fontSize: "1rem", lineHeight: 1.6, marginBottom: "1.75rem" }}>
                Get custom project credit terms, dedicated site dispatch coordinators, and priority flatbed crane access for your pouring schedules.
              </p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <a href="tel:+9107122894000" className="btn btn-primary btn-lg">
                  <HardHat size={18} /> Call Contractor Desk
                </a>
                <Link to="/products" className="btn btn-secondary btn-lg" style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)" }}>
                  Order Sample Batch
                </Link>
              </div>
            </div>

            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "var(--radius-lg)",
              padding: "1.75rem"
            }}>
              <h4 style={{ color: "#ffffff", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShieldCheck size={20} color="var(--brand-accent)" /> BuildMart Contractor Guarantee
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.875rem", color: "#cbd5e1" }}>
                <li>✓ Guaranteed batch consistency across multiple pours</li>
                <li>✓ Mill test report & weight bridge slips with every truck</li>
                <li>✓ Dedicated driver contact & real-time GPS tracking</li>
                <li>✓ Zero demurrage charges for pre-scheduled drops</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
