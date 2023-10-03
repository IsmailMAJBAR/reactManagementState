import React, { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Detail from "./Detail"; //import Detail from "./DetailRef";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { CartContext } from "./cartContext";
import cartReducer from "./cartReducer";

let initialCart;

try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? []
} catch {
  console.error("cart could not be parsed into json");
  initialCart = [];
}

export default function App() {

  const [cart, dispatch] = useReducer(cartReducer, initialCart);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart]);


  return (
    <CartContext.Provider value={ { cart, dispatch } }>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={ <h1>Welcome to the shop</h1> }
            />
            <Route
              path="/:category"
              element={ <Products /> } />
            <Route
              path="/cart"
              element={ <Cart /> }
            />
            <Route
              path="/:category/:id"
              element={ <Detail />
              }
            />
            <Route
              path="/checkout"
              element={ <Checkout /> }
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </CartContext.Provider>
  );
}