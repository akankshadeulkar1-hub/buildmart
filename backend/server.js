const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());

// Request logger for development
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root & Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "BuildMart API Server",
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BuildMart API Server running on port ${PORT}`);
  console.log(`📦 Endpoints: http://localhost:${PORT}/api/products, http://localhost:${PORT}/api/orders`);
});
