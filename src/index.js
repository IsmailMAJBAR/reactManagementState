import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import WrappedApp from "./AppClass";
import ErrorBoundary from "./ErrorBoundary";
import { CartProvider } from "./cartContext";


ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <CartProvider>
        <WrappedApp />
      </CartProvider>
    </BrowserRouter>
  </ErrorBoundary>
  , document.getElementById("root")
);
