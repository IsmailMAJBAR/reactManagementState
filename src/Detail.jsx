import { default as React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";


export default function Detail(props) {
  const [sku, setSize] = useState("");

  const { id, category } = useParams();
  const navigate = useNavigate();

  const { data: product, loading, error } = useFetch("products/" + id);

  function renderAvSizeOptions(p) {
    return (
      <option
        key={ p.sku }
        value={ p.sku }
      >
        { p.size }
      </option>
    );
  };



  if (error) throw error;

  if (loading) return <Spinner />;

  if (!product) return <PageNotFound />;


  return (
    <div id="detail">
      <h1>{ product.name }</h1>
      <p>{ product.description }</p>
      <p id="price">${ product.price }</p>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{ " " }
        <select id="size" value={ sku } onChange={ (event) => setSize(event.target.value) }>
          <option value=''>what size ?</option>
          { product.skus.map(renderAvSizeOptions) }
        </select>
      </section>
      <p>
        <button
          disabled={ !sku }
          className="btn btn-primary"
          onClick={
            () => {
              props.dispatch({ type: "addToCart", id, sku });
              navigate("/cart")
            }
          }>
          Add to Cart
        </button></p>

      <img style={ { "width": "500px" } } src={ `/images/${ product.image }` } alt={ category } />
    </div >



  );
}

