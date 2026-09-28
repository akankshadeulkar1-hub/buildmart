// BuildMart Central API Client
const API_BASE_URL = "/api";

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== "All") query.append("category", params.category);
  if (params.search) query.append("search", params.search);
  if (params.minPrice) query.append("minPrice", params.minPrice);
  if (params.maxPrice) query.append("maxPrice", params.maxPrice);
  if (params.sortBy) query.append("sortBy", params.sortBy);
  if (params.inStockOnly) query.append("inStockOnly", "true");

  const url = `${API_BASE_URL}/products${query.toString() ? `?${query.toString()}` : ""}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("fetchProducts error:", err);
    throw err;
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error(`Product #${id} not found`);
    return await res.json();
  } catch (err) {
    console.error(`fetchProductById(${id}) error:`, err);
    throw err;
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/products/categories`);
    if (!res.ok) throw new Error("Failed to load categories");
    return await res.json();
  } catch (err) {
    console.error("fetchCategories error:", err);
    throw err;
  }
}

export async function fetchOrders() {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`);
    if (!res.ok) throw new Error("Failed to fetch orders");
    return await res.json();
  } catch (err) {
    console.error("fetchOrders error:", err);
    throw err;
  }
}

export async function fetchOrderById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!res.ok) throw new Error(`Order #${id} not found`);
    return await res.json();
  } catch (err) {
    console.error(`fetchOrderById(${id}) error:`, err);
    throw err;
  }
}

export async function createOrder(orderPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create order");
    return data;
  } catch (err) {
    console.error("createOrder error:", err);
    throw err;
  }
}

export async function updateOrderStatus(id, status, note = "") {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, note })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update order status");
    return data;
  } catch (err) {
    console.error(`updateOrderStatus(${id}) error:`, err);
    throw err;
  }
}
