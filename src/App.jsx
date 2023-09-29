import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Cart";
import Detail from "./Detail";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";


export default function App() {

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={ <h1>Welcome to the shop</h1> } />
            <Route path="/:category" element={ <Products /> } />
            <Route path="/cart" element={ <Cart /> } />
            <Route path="/detail" element={ <Detail /> } />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
