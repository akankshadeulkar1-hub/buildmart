// BuildMart Orders In-Memory Store
let orders = [
  {
    id: "BM-ORD-2026-8901",
    customer: {
      fullName: "Vikram Malhotra",
      email: "vikram@apexbuilders.in",
      phone: "+91 98230 45678"
    },
    shippingAddress: {
      siteName: "Apex Horizon Tower - Site B",
      street: "Plot 104, IT Park Ring Road",
      city: "Nagpur",
      state: "Maharashtra",
      pincode: "440022",
      accessNotes: "Flatbed truck access available. Unloading gate 2."
    },
    deliveryType: "Flatbed Crane Unload",
    deliveryFee: 1200,
    items: [
      {
        productId: "prod-001",
        name: "UltraTech Super Premium Cement (50kg)",
        unit: "bag",
        price: 395,
        quantity: 50,
        subtotal: 19750,
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80"
      },
      {
        productId: "prod-004",
        name: "Washed River Sand (Coarse Grade for Concreting)",
        unit: "ton",
        price: 1850,
        quantity: 10,
        subtotal: 18500,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
      }
    ],
    itemSubtotal: 38250,
    discountAmount: 1580,
    taxAmount: 1833,
    totalAmount: 39703,
    paymentMethod: "Bank NEFT / RTGS (Verified)",
    paymentStatus: "Paid",
    orderStatus: "Out for Delivery",
    timeline: [
      { status: "Order Placed", timestamp: "2026-09-27T08:30:00.000Z", completed: true, note: "Order placed online via BuildMart Portal" },
      { status: "Confirmed & Yard Assigned", timestamp: "2026-09-27T10:15:00.000Z", completed: true, note: "Assigned to BuildMart Central Yard Depot 4" },
      { status: "Dispatched", timestamp: "2026-09-28T06:00:00.000Z", completed: true, note: "Loaded on Flatbed Truck MH-31-TR-9021 with Crane Operator" },
      { status: "Out for Delivery", timestamp: "2026-09-28T08:00:00.000Z", completed: true, note: "Driver: Ramesh (Ph: +91 94221 00223). ETA ~11:30 AM" },
      { status: "Delivered & Signed", timestamp: null, completed: false, note: "Site supervisor signature required upon drop" }
    ],
    createdAt: "2026-09-27T08:30:00.000Z"
  },
  {
    id: "BM-ORD-2026-8902",
    customer: {
      fullName: "Ananya Deshmukh",
      email: "ananya.designs@gmail.com",
      phone: "+91 97654 32190"
    },
    shippingAddress: {
      siteName: "Deshmukh Residence Renovation",
      street: "Flat 402, Green Valley Enclave, Civil Lines",
      city: "Nagpur",
      state: "Maharashtra",
      pincode: "440001",
      accessNotes: "Freight elevator available. Ring bell for basement entry."
    },
    deliveryType: "Standard Site Drop",
    deliveryFee: 450,
    items: [
      {
        productId: "prod-007",
        name: "Kajaria Glazed Vitrified Floor Tiles - Calacatta Gold (60x120cm)",
        unit: "sq.ft",
        price: 78,
        quantity: 250,
        subtotal: 19500,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80"
      },
      {
        productId: "prod-005",
        name: "Dr. Fixit Fastflex Waterproofing Membrane (12kg)",
        unit: "bucket",
        price: 2450,
        quantity: 2,
        subtotal: 4900,
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=400&q=80"
      }
    ],
    itemSubtotal: 24400,
    discountAmount: 0,
    taxAmount: 1220,
    totalAmount: 26070,
    paymentMethod: "Cash on Site Delivery",
    paymentStatus: "Pending on Drop",
    orderStatus: "Confirmed",
    timeline: [
      { status: "Order Placed", timestamp: "2026-09-28T07:15:00.000Z", completed: true, note: "Order placed with COD confirmation" },
      { status: "Confirmed & Yard Assigned", timestamp: "2026-09-28T08:00:00.000Z", completed: true, note: "Inventory allocated at Tile Depot" },
      { status: "Dispatched", timestamp: null, completed: false, note: "Awaiting dispatch scheduling" },
      { status: "Out for Delivery", timestamp: null, completed: false, note: "Dispatch expected today 3:00 PM" },
      { status: "Delivered & Signed", timestamp: null, completed: false, note: "Payment collection upon site inspection" }
    ],
    createdAt: "2026-09-28T07:15:00.000Z"
  }
];

function getOrders() {
  return orders;
}

function getOrderById(id) {
  return orders.find(o => o.id.toLowerCase() === id.toLowerCase());
}

function addOrder(orderData) {
  orders.unshift(orderData);
  return orderData;
}

function updateOrderStatus(id, newStatus, note = "") {
  const order = getOrderById(id);
  if (!order) return null;

  order.orderStatus = newStatus;
  
  const statusStep = order.timeline.find(t => t.status.toLowerCase().includes(newStatus.toLowerCase()));
  if (statusStep) {
    statusStep.completed = true;
    statusStep.timestamp = new Date().toISOString();
    if (note) statusStep.note = note;
  }
  
  return order;
}

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  updateOrderStatus
};
