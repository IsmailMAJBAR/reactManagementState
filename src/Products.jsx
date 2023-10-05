import React, { useState } from "react";
import { useQuery } from 'react-query';
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Spinner from "./Spinner";

import { Link } from "react-router-dom";


export default function Products() {
  const [size, setSize] = useState("");
  const { category } = useParams();

  const fetchProducts = async (key, category) => {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + "products?category=" + category);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data: products, isLoading, error } =
    useQuery({
      queryKey: ['productsCacheData'],
      queryFn: () => fetchProducts('productsCacheData', category),
    });

  function renderProduct(p) {
    return (
      <div key={ p.id } className="product">
        <Link to={ `/${ category }/${ p.id }` }>
          <img src={ `/images/${ p.image }` } alt={ p.name } />
          <h3>{ p.name }</h3>
          <p>${ p.price }</p>
        </Link>
      </div>
    );
  };

  const filterProduct = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  if (error) throw error;

  if (isLoading) return <Spinner />;

  if (products.length === 0) return <PageNotFound />;


  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{ " " }
        <select id="size" value={ size } onChange={ (event) => setSize(event.target.value) }>
          <option value=''>All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </section>
      { size && <h2>Found { filterProduct.length } items</h2> }
      <section id="products">
        { filterProduct.map(renderProduct) }
      </section>
    </>
  );
}