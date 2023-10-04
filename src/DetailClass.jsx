import { default as React } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Spinner from "./Spinner";
import { useCartContext } from "./cartContext";
import useFetch from "./services/useFetch";

export default function DetailWrapper() {
  const { dispatch } = useCartContext();
  const { id } = useParams();
  const fetchResponse = useFetch("products/" + id);

  return (
    <Detail
      id={ id }
      fetchResponse={ fetchResponse }
      dispatch={ dispatch }
      navigate={ useNavigate() }
    ></Detail>
  )
}

class Detail extends React.Component {
  state = { sku: "", };

  render() {
    const { id,
      fetchResponse,
      dispatch,
      navigate
    } = this.props;

    const { sku } = this.state;

    const { data: product, loading, error } = fetchResponse;

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
          <select id="size" value={ sku } onChange={ (event) =>
            this.setState({ sku: event.target.value })
          }>
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
                dispatch({ type: "addToCart", id, sku });
                navigate("/cart")
              }
            }>
            Add to Cart
          </button></p>

        <img
          style={ { "width": "500px" } }
          src={ `/images/${ product.image }` }
          alt={ product.category }
        />
      </div >
    );
  }

}

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