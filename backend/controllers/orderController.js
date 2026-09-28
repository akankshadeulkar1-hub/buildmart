const { getOrders: fetchOrders, getOrderById: fetchOrderById, addOrder, updateOrderStatus: mutateStatus } = require("../data/orders");
const products = require("../data/products");

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public
const getOrders = (req, res) => {
  try {
    const orders = fetchOrders();
    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = (req, res) => {
  try {
    const order = fetchOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: `Order #${req.params.id} not found` });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
const createOrder = (req, res) => {
  try {
    const { customer, shippingAddress, items, deliveryType, paymentMethod } = req.body;

    // Validation
    if (!customer || !customer.fullName || !customer.phone) {
      return res.status(400).json({
        success: false,
        message: "Customer full name and contact phone number are required."
      });
    }

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.pincode) {
      return res.status(400).json({
        success: false,
        message: "Complete site delivery address (street, city, pincode) is required."
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one building material item."
      });
    }

    // Verify items and calculate subtotal
    let itemSubtotal = 0;
    let discountAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      const prod = products.find(p => p.id === item.productId);
      const price = prod ? prod.price : (item.price || 0);
      const name = prod ? prod.name : item.name;
      const unit = prod ? prod.unit : (item.unit || "unit");
      const image = prod ? prod.image : item.image;
      const qty = Number(item.quantity) || 1;

      const lineTotal = price * qty;
      itemSubtotal += lineTotal;

      // Check bulk discount
      if (prod && prod.bulkDiscount && qty >= prod.bulkDiscount.minQty) {
        const itemDiscount = (lineTotal * prod.bulkDiscount.discountPercent) / 100;
        discountAmount += itemDiscount;
      }

      validatedItems.push({
        productId: item.productId,
        name,
        unit,
        price,
        quantity: qty,
        subtotal: lineTotal,
        image
      });
    }

    // Delivery fee calculation
    let deliveryFee = 450; // standard site drop
    if (deliveryType === "Flatbed Crane Unload") {
      deliveryFee = 1200;
    } else if (deliveryType === "Express Same-Day Tipper") {
      deliveryFee = 1800;
    } else if (deliveryType === "Self Yard Pickup") {
      deliveryFee = 0;
    }

    // If subtotal is high (e.g. > 50,000), waive standard delivery
    if (itemSubtotal >= 50000 && deliveryType === "Standard Site Drop") {
      deliveryFee = 0;
    }

    const discountedSubtotal = itemSubtotal - discountAmount;
    const taxAmount = Math.round(discountedSubtotal * 0.05); // 5% GST on building materials
    const totalAmount = Math.round(discountedSubtotal + taxAmount + deliveryFee);

    const orderId = `BM-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: orderId,
      customer: {
        fullName: customer.fullName.trim(),
        email: customer.email ? customer.email.trim() : "",
        phone: customer.phone.trim()
      },
      shippingAddress: {
        siteName: shippingAddress.siteName || "Construction Project Site",
        street: shippingAddress.street.trim(),
        city: shippingAddress.city.trim(),
        state: shippingAddress.state || "Maharashtra",
        pincode: shippingAddress.pincode.trim(),
        accessNotes: shippingAddress.accessNotes || "Standard gate access"
      },
      deliveryType: deliveryType || "Standard Site Drop",
      deliveryFee,
      items: validatedItems,
      itemSubtotal,
      discountAmount,
      taxAmount,
      totalAmount,
      paymentMethod: paymentMethod || "Cash on Site Delivery",
      paymentStatus: paymentMethod === "Cash on Site Delivery" ? "Pending on Drop" : "Confirmed",
      orderStatus: "Confirmed",
      timeline: [
        {
          status: "Order Placed",
          timestamp: new Date().toISOString(),
          completed: true,
          note: "Order received and logged in BuildMart fulfillment system"
        },
        {
          status: "Confirmed & Yard Assigned",
          timestamp: new Date().toISOString(),
          completed: true,
          note: "Stock reserved at central distribution yard"
        },
        {
          status: "Dispatched",
          timestamp: null,
          completed: false,
          note: "Scheduled for transport loading"
        },
        {
          status: "Out for Delivery",
          timestamp: null,
          completed: false,
          note: "Assigned to carrier fleet"
        },
        {
          status: "Delivered & Signed",
          timestamp: null,
          completed: false,
          note: "Site supervisor delivery slip signoff"
        }
      ],
      createdAt: new Date().toISOString()
    };

    addOrder(newOrder);

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Public
const updateOrderStatus = (req, res) => {
  try {
    const { status, note } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: "New status is required" });
    }

    const updated = mutateStatus(req.params.id, status, note);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      message: `Order #${req.params.id} updated to ${status}`,
      order: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
};
