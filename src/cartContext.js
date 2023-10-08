import React, { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "./cartReducer";

export const CartContext = createContext(null);


let initialCart;

try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("cart could not be parsed into json");
  initialCart = [];
}

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return <CartContext.Provider value={ { cart, dispatch, itemsInCart } }>
    { props.children }
  </CartContext.Provider>
}


export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("UseCartContext must be used within a cartProvider wrapped in a parent component Provider ");
  }
  return context;
}