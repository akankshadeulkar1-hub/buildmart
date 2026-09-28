import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("buildmart_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem("buildmart_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const showToast = (message, type = "info") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const addToCart = (product, quantityToAdd = 1) => {
    const qty = Math.max(1, Number(quantityToAdd));
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + qty;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          lineTotal: newQty * product.price
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity: qty,
            lineTotal: qty * product.price
          }
        ];
      }
    });

    showToast(`Added ${qty} ${product.unit}(s) of ${product.name} to cart!`, "success");
  };

  const updateQuantity = (productId, newQuantity) => {
    const qty = Number(newQuantity);
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: qty,
            lineTotal: qty * item.product.price
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const item = prevCart.find(i => i.product.id === productId);
      if (item) {
        showToast(`Removed ${item.product.name} from cart`, "warning");
      }
      return prevCart.filter(item => item.product.id !== productId);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  // Bulk Discount calculation
  const discountAmount = cart.reduce((acc, item) => {
    const { product, quantity } = item;
    if (product.bulkDiscount && quantity >= product.bulkDiscount.minQty) {
      return acc + (item.lineTotal * product.bulkDiscount.discountPercent) / 100;
    }
    return acc;
  }, 0);

  const discountedSubtotal = subtotal - discountAmount;
  const taxAmount = Math.round(discountedSubtotal * 0.05);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        discountAmount,
        discountedSubtotal,
        taxAmount,
        toasts,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
