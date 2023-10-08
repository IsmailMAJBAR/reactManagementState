import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCartContext } from "./cartContext";
import "./header.css";

export default function Header() {
  const { cart } = useCartContext();
  const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            <NavLink
              className={ ({ isActive }) => (isActive ? "active" : "") }
              to="/shoes">
              Shoes
            </NavLink>
          </li>
          <li>
            <NavLink
              className={ ({ isActive }) => (isActive ? "active" : "") }
              to="/backpack">
              Backpack
            </NavLink>
          </li>
          <li>
            <NavLink className={ ({ isActive }) => (isActive ? "active" : "") } to="/cart">
              { itemsInCart === 0 ? "Cart" : "Cart (" + itemsInCart + ")" }
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
