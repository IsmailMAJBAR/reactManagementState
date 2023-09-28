import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import { getProducts } from "./services/productService";

export default function App() {
  const [size, setSize] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts("shoes").then((response) => setProducts(response)
    )
  }, [])

  function renderProduct(p) {
    return (
      <div key={ p.id } className="product">
        <a href="/">
          <img src={ `/images/${ p.image }` } alt={ p.name } />
          <h3>{ p.name }</h3>
          <p>${ p.price }</p>
        </a>
      </div>
    );
  }

  const filterProduct = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{ " " }
            <select id="size" value={ size }
              onChange={ (event) => setSize(event.target.value) }>
              <option  >All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </section>
          { size && <h2>Found { filterProduct.length }  items</h2> }
          <section id="products">
            { filterProduct.map(renderProduct) }
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
