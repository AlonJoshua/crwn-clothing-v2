import React, { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const newCartItems = [...cartItems];
  const existingCartItemIndex = newCartItems.findIndex((item) => {
    return item.id === productToAdd.id;
  });

  if (existingCartItemIndex === -1) {
    newCartItems.push({ ...productToAdd, quantity: 1 });
  } else {
    newCartItems[existingCartItemIndex].quantity += 1;
  }

  return newCartItems;
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
