import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";

export default function Detail() {

  const { id, category } = useParams();
  const navigate = useNavigate();

  const { data: product, loading, error } = useFetch("products/" + id);

  if (error) throw error;

  if (loading) return <Spinner />;

  if (!product) return <PageNotFound />;

  return (
    <div id="detail">
      <h1>{ product.name }</h1>
      <p>{ product.description }</p>
      <p id="price">${ product.price }</p>
      <p ><button className="btn btn-primary" onClick={ () => navigate("/cart") }>Add to Cart</button></p>
      <img style={ { "width": "500px" } } src={ `/images/${ product.image }` } alt={ category } />
    </div >
  );
}
