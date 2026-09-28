import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchProductById, fetchProducts } from "../services/api";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { 
  Star, 
  ShoppingCart, 
  Truck, 
  ShieldCheck, 
  Plus, 
  Minus, 
  ChevronRight, 
  FileText, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const res = await fetchProductById(id);
        if (res && res.product) {
          setProduct(res.product);
          setQuantity(res.product.moq || 1);

          // Fetch related
          const relRes = await fetchProducts({ category: res.product.category });
          if (relRes && relRes.products) {
            setRelatedProducts(relRes.products.filter(p => p.id !== res.product.id).slice(0, 4));
          }
        }
      } catch (err) {
        console.error("Failed to load product details", err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "5rem 0", textAlign: "center", color: "var(--text-muted)" }}>
        Loading material specifications...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: "5rem 0", textAlign: "center" }}>
        <h2>Product Not Found</h2>
        <p style={{ color: "var(--text-secondary)", margin: "1rem 0 1.5rem" }}>
          The requested building supply could not be located in our inventory.
        </p>
        <Link to="/products" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const hasBulkDiscount = product.bulkDiscount && quantity >= product.bulkDiscount.minQty;
  const rawSubtotal = product.price * quantity;
  const discountVal = hasBulkDiscount
    ? (rawSubtotal * product.bulkDiscount.discountPercent) / 100
    : 0;
  const finalLineTotal = rawSubtotal - discountVal;

  return (
    <div style={{ flex: 1, padding: "2rem 0 4rem" }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "2rem", flexWrap: "wrap" }}>
          <Link to="/" style={{ color: "var(--text-secondary)" }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" style={{ color: "var(--text-secondary)" }}>Catalog</Link>
          <ChevronRight size={14} />
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} style={{ color: "var(--text-secondary)" }}>
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{product.name}</span>
        </div>

        {/* Product Details Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          backgroundColor: "#ffffff",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-light)",
          padding: "2.5rem",
          boxShadow: "var(--shadow-sm)",
          marginBottom: "3rem"
        }}>
          {/* Left: Product Image Box */}
          <div>
            <div style={{
              position: "relative",
              height: "440px",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              backgroundColor: "#f1f5f9"
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {product.badge && (
                <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                  <span className="badge badge-brand" style={{ fontSize: "0.85rem", padding: "0.4rem 0.85rem" }}>
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Site Delivery Assurance */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginTop: "1.5rem"
            }}>
              <div style={{
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--bg-tertiary)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <Truck size={24} color="var(--brand-primary)" />
                <div style={{ fontSize: "0.825rem" }}>
                  <strong>Site Direct Dispatch</strong><br />
                  Flatbed & crane unload ready
                </div>
              </div>

              <div style={{
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--bg-tertiary)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <ShieldCheck size={24} color="var(--status-success)" />
                <div style={{ fontSize: "0.825rem" }}>
                  <strong>IS / BIS Certified</strong><br />
                  Batch quality certified
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info & Purchase Controls */}
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--brand-primary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.35rem" }}>
              {product.brand} • {product.category}
            </div>

            <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem", lineHeight: 1.25 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", color: "#f59e0b" }}>
                <Star size={16} fill="#f59e0b" />
              </div>
              <strong style={{ fontSize: "0.95rem" }}>{product.rating}</strong>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                ({product.reviewsCount} contractor reviews)
              </span>
              <span style={{ color: "var(--border-medium)" }}>•</span>
              <span style={{ color: "var(--status-success)", fontWeight: 600, fontSize: "0.85rem" }}>
                ✓ {product.inStock} {product.unit} Available in Yard
              </span>
            </div>

            {/* Price Box */}
            <div style={{
              padding: "1.25rem",
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-light)",
              marginBottom: "1.5rem"
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--brand-primary)" }}>₹</span>
                <span style={{ fontSize: "2.25rem", fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--brand-primary)" }}>
                  {Number(product.price).toLocaleString("en-IN")}
                </span>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                  / {product.unit} (Exclusive of 5% GST)
                </span>
              </div>

              {/* Bulk discount tag */}
              {product.bulkDiscount && (
                <div style={{
                  marginTop: "0.75rem",
                  padding: "0.5rem 0.85rem",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--brand-primary-light)",
                  border: "1px solid rgba(234, 88, 12, 0.2)",
                  fontSize: "0.85rem",
                  color: "var(--brand-primary)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <AlertCircle size={16} />
                  Contractor Bulk Offer: Get {product.bulkDiscount.discountPercent}% OFF on orders of {product.bulkDiscount.minQty} {product.unit} or more!
                </div>
              )}
            </div>

            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.75rem" }}>
              {product.description}
            </p>

            {/* Quantity Stepper & Subtotal */}
            <div style={{ marginBottom: "1.75rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Order Quantity ({product.unit}):
                {product.moq > 1 && (
                  <span style={{ color: "var(--brand-primary)", fontWeight: 500, marginLeft: "0.5rem" }}>
                    (Min. Order Quantity: {product.moq} {product.unit})
                  </span>
                )}
              </label>

              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "#ffffff"
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(product.moq || 1, quantity - 1))}
                    style={{
                      padding: "0.6rem 0.9rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(product.moq || 1, Number(e.target.value)))}
                    style={{
                      width: "70px",
                      textAlign: "center",
                      border: "none",
                      fontWeight: 700,
                      fontSize: "1rem",
                      outline: "none"
                    }}
                    min={product.moq || 1}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      padding: "0.6rem 0.9rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Order Line Subtotal:</div>
                  <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
                    ₹{Math.round(finalLineTotal).toLocaleString("en-IN")}
                    {hasBulkDiscount && (
                      <span style={{ fontSize: "0.85rem", color: "var(--status-success)", marginLeft: "0.5rem" }}>
                        ({product.bulkDiscount.discountPercent}% bulk savings applied)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-lg"
                style={{ flex: 1.2 }}
                id="details-add-to-cart"
              >
                {added ? (
                  <>
                    <CheckCircle2 size={18} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Add {quantity} {product.unit} to Cart
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="btn btn-dark btn-lg"
                style={{ flex: 1 }}
              >
                Direct Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Technical Specifications Section */}
        {product.specifications && (
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)",
            padding: "2rem",
            marginBottom: "3rem"
          }}>
            <h3 style={{ fontSize: "1.35rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FileText size={20} color="var(--brand-primary)" />
              Technical & Material Specifications
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {Object.entries(product.specifications).map(([key, val]) => (
                <div
                  key={key}
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--bg-primary)",
                    border: "1px solid var(--border-light)",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <span style={{ color: "var(--text-secondary)", fontWeight: 600, fontSize: "0.875rem" }}>{key}:</span>
                  <span style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "0.875rem" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Materials */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
              Related {product.category} Materials
            </h3>
            <div className="product-grid">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
