import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../services/api";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { Search, ArrowUpDown, SlidersHorizontal, X, Package } from "lucide-react";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("popular");
  const [inStockOnly, setInStockOnly] = useState(false);

  // Sync state if URL changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get("search");
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          fetchProducts({
            category: selectedCategory,
            search: searchQuery,
            sortBy,
            inStockOnly
          }),
          fetchCategories()
        ]);
        if (prodRes && prodRes.products) setProducts(prodRes.products);
        if (catRes && catRes.categories) setCategories(catRes.categories);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedCategory, searchQuery, sortBy, inStockOnly]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", cat);
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      newParams.set("search", searchQuery.trim());
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("popular");
    setInStockOnly(false);
    setSearchParams({});
  };

  return (
    <div style={{ flex: 1, padding: "2.5rem 0 4rem" }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: "2rem" }}>
          <span className="badge badge-brand" style={{ marginBottom: "0.5rem" }}>
            Materials Inventory
          </span>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
            {selectedCategory === "All" ? "All Building Supplies & Equipment" : selectedCategory}
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Current stock available at BuildMart Central Logistics Yard. Direct site dispatch available.
          </p>
        </div>

        {/* Category Filter Pills */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Control & Filter Bar */}
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
          {/* Search box inside catalog */}
          <form onSubmit={handleSearchSubmit} style={{ position: "relative", minWidth: "280px" }}>
            <Search size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search by brand, grade, or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.85rem 0.5rem 2.4rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-medium)",
                fontSize: "0.875rem",
                outline: "none"
              }}
            />
          </form>

          {/* Controls: Sort and In-stock */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            {/* Stock Toggle */}
            <label style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.875rem", cursor: "pointer", fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                style={{ accentColor: "var(--brand-primary)", width: "16px", height: "16px" }}
              />
              In Stock Only
            </label>

            {/* Sort Dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem" }}>
              <ArrowUpDown size={15} color="var(--text-muted)" />
              <span style={{ color: "var(--text-secondary)" }}>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "0.45rem 0.75rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "#ffffff",
                  fontSize: "0.875rem",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(selectedCategory !== "All" || searchQuery || inStockOnly) && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: 600 }}>Active Filters:</span>
            {selectedCategory !== "All" && (
              <span className="badge badge-brand" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                Category: {selectedCategory}
                <X size={12} style={{ cursor: "pointer" }} onClick={() => handleCategorySelect("All")} />
              </span>
            )}
            {searchQuery && (
              <span className="badge badge-info" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                Query: "{searchQuery}"
                <X size={12} style={{ cursor: "pointer" }} onClick={() => { setSearchQuery(""); const p = new URLSearchParams(searchParams); p.delete("search"); setSearchParams(p); }} />
              </span>
            )}
            {inStockOnly && (
              <span className="badge badge-success" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                In Stock Only
                <X size={12} style={{ cursor: "pointer" }} onClick={() => setInStockOnly(false)} />
              </span>
            )}
            <button
              onClick={clearAllFilters}
              style={{
                background: "none",
                border: "none",
                color: "var(--brand-primary)",
                fontSize: "0.825rem",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
                marginLeft: "0.5rem"
              }}
            >
              Reset All
            </button>
          </div>
        )}

        {/* Product Grid or Loading / Empty */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "var(--text-muted)" }}>
            Loading materials from BuildMart inventory...
          </div>
        ) : products.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "5rem 2rem",
            backgroundColor: "#ffffff",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)"
          }}>
            <Package size={48} style={{ color: "var(--text-muted)", margin: "0 auto 1rem" }} />
            <h3 style={{ fontSize: "1.35rem", marginBottom: "0.5rem" }}>No matching materials found</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              We couldn't find any items matching your selected criteria. Try adjusting your query or category.
            </p>
            <button onClick={clearAllFilters} className="btn btn-primary">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              Showing <strong>{products.length}</strong> construction materials
            </div>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
