import React, { createContext, useEffect, useReducer } from "react";
import cartReducer from "./cartReducer";

export const CartContext = createContext(null);


let initialCart;

try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? []
} catch {
  console.error("cart could not be parsed into json");
  initialCart = [];
}

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart]);

  return <CartContext.Provider value={ { cart, dispatch } }>
    { props.children }
  </CartContext.Provider>
}