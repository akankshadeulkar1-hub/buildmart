const products = require("../data/products");

// @desc    Get all products with optional filtering, search, and sorting
// @route   GET /api/products
// @access  Public
const getProducts = (req, res) => {
  try {
    let { category, search, minPrice, maxPrice, sortBy, inStockOnly } = req.query;
    let filtered = [...products];

    // Filter by Category
    if (category && category !== "All") {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Search by Name, Brand, or Description
    if (search && search.trim() !== "") {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Filter by Min / Max Price
    if (minPrice) {
      filtered = filtered.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }

    // Filter inStock
    if (inStockOnly === "true") {
      filtered = filtered.filter(p => p.inStock > 0);
    }

    // Sorting
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "reviews") {
      filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    res.json({
      success: true,
      count: filtered.length,
      products: filtered
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = (req, res) => {
  try {
    const product = products.find(p => p.id.toLowerCase() === req.params.id.toLowerCase());
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get categories with counts
// @route   GET /api/products/categories
// @access  Public
const getCategories = (req, res) => {
  try {
    const categoryCounts = {};
    products.forEach(p => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    const categoryList = Object.keys(categoryCounts).map(name => ({
      name,
      count: categoryCounts[name],
      sampleImage: products.find(p => p.category === name)?.image
    }));

    res.json({ success: true, categories: categoryList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getCategories
};
