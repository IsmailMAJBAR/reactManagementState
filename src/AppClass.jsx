import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Cart";
import Checkout from "./CheckoutClass";
import Detail from "./Detail"; //import Detail from "./DetailRef";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { useCartContext } from "./cartContext";

export default function App() {
  const { dispatch } = useCartContext();
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={ <h1>Welcome to the shop</h1> } />
            <Route path="/:category" element={ <Products /> } />
            <Route path="/cart" element={ <Cart /> } />
            <Route path="/:category/:id" element={ <Detail /> } />
            <Route path="/checkout" element={ <Checkout dispatch={ dispatch } /> } />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}