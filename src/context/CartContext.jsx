import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Handle 'Add to Cart' button on product page
  const addToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((val) => val.id === item.id);
      if (existingItem) {
        return prev.map((val) =>
          val.id === item.id ? { ...val, quantity: val.quantity + 1 } : val,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Increment the quantity of an item in the cart
  const increment = (itemId) => {
    setCart((prev) =>
      prev.map((val) =>
        val.id === itemId ? { ...val, quantity: val.quantity + 1 } : val,
      ),
    );
  };

  // Decrement the quantity of an item in the cart
  const decrement = (itemId) => {
    setCart(
      (prev) =>
        prev
          .map((val) =>
            val.id === itemId ? { ...val, quantity: val.quantity - 1 } : val,
          )
          .filter((val) => val.quantity > 0), // Remove items with quantity 0 from the cart
    );
  };

  // Remove an item from the cart entirely
  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((val) => val.id !== itemId));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Helper function to parse and format price values
  const parsePrice = (price) => {
    if (typeof price === "number" && Number.isFinite(price))
      return price.toFixed(2);
    if (!price) return "0.00";

    let priceStr = String(price).trim();
    // Remove currency symbols and other non-numeric characters
    priceStr = priceStr.replace(/[^0-9.]/g, "");
    const parts = priceStr.split(".");

    // Keep only the first decimal point if multiple exist
    if (parts.length > 2) {
      const firstPart = parts.shift();
      priceStr = firstPart + "." + parts.join("");
    }

    // Parse and format the cleaned price, or return a default if invalid
    const finalPrice = parseFloat(priceStr);
    return Number.isFinite(finalPrice) ? finalPrice.toFixed(2) : "0.00";
  };

  const totalItems = cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );
  const totalPrice = cart
    .reduce(
      (sum, item) => sum + (item.quantity || 0) * (parsePrice(item.price) || 0),
      0,
    )
    .toFixed(2);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increment, decrement, removeFromCart, clearCart, parsePrice, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
