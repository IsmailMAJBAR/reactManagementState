import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useCartContext } from "./cartContext";

export default function Cart() {
  const { cart, dispatch } = useCartContext();
  const urls = cart.map((i) => `products/${ i.id }`);

  const fetchCartItems = async (urls) => {
    const response = await Promise.all(
      urls.map(
        async url => {
          const rep = await fetch(process.env.REACT_APP_API_BASE_URL + url);
          if (!rep.ok) {
            throw new Error(`fetching ${ url } was not ok. Return status:${ rep.status }`);
          }
          return rep.json();
        }
      )
    );
    return response;
  };
  // const fetchCartItems = async (urls) => {
  //   const data = await Promise.all(
  //     urls.map(async url => {
  //       const response = await fetch(process.env.REACT_APP_API_BASE_URL + url);
  //       if (!response.ok) {
  //         throw new Error(`Fetching ${ url } resulted in ${ response.statusText }`);
  //       }
  //       return response.json();
  //     })
  //   );
  //   return data;
  // };

  // const { data: products, loading, error } = useFetchAll(urls);

  const { data: products, isLoading, error } =
    useQuery({
      queryKey: ['cartData'],
      queryFn: () => fetchCartItems(urls),
      retry: 0,
    });

  const navigate = useNavigate();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart;
    const avProduct = products.find(
      (p) => p.id === parseInt(id)
    );

    if (!avProduct) {
      return <Spinner key={ `spinner-${ sku }` } />; // or return a placeholder or error message
    }
    const { price, name, image, skus } = avProduct;
    const { size } = skus.find((s) => s.sku === sku);

    return (
      <li key={ sku } className="cart-item">
        <img src={ `/images/${ image }` } alt={ name } />
        <div>
          <h3>{ name }</h3>
          <p>${ price }</p>
          <p>Size: { size }</p>
          <p>
            <select
              aria-label={ `Select quantity for ${ name } size ${ size }` }
              onChange={ (e) =>
                dispatch({ type: "updateQuantity", sku, quantity: parseInt(e.target.value) })
              }
              value={ quantity }
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
        </div>
      </li >
    );
  }

  if (error) throw new Error("cart error", error);
  if (isLoading || !products) return <Spinner />;

  return (
    <section id="cart">
      <h1>{ totalItems === 0 ? " You have no item yet." : totalItems > 1 ? `You have ${ totalItems } items.` : "You have 1 item." }</h1>
      { cart.length > 0 && <button
        className="btn btn-primary"
        onClick={ () => { navigate("/checkout") }
        } >
        Go to shipping
      </button> }
      <ul>{ cart.map(renderItem) }</ul>

    </section>
  );
}

