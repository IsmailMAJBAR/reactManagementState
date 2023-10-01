import React, { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

const STATUS = {
  IDLE: "IDLE",
  SUBMITTING: "SUBMITTING",
  SUBMITTED: "SUBMITTED",
  COMPLETED: "COMPLETED"
}

export default function Checkout({ cart, emptyCart }) {
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [formError, setFormError] = useState(null);

  function handleChange(e) {
    // TODO
    e.persist();
    setAddress((currentAddress) => {
      return { ...currentAddress, [e.target.id]: e.target.value }
    })
  }

  function handleBlur(event) {
    // TODO
  }

  async function handleSubmit(event) {
    // TODO
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    try {
      await saveShippingAddress(address);
      emptyCart();
      setStatus(STATUS.COMPLETED);
    } catch (e) {
      setFormError(e);
    }
  }

  if (formError) throw formError;

  if (status === STATUS.COMPLETED) {
    return (<h1>Thanks for shopping</h1>)
  }

  return (
    <>
      <h1>Shipping Info</h1>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={ address.city }
            onBlur={ handleBlur }
            onChange={ handleChange }
          />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={ address.country }
            onBlur={ handleBlur }
            onChange={ handleChange }
          >
            <option value="">Select Country</option>
            <option value="Canada">Canada</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="France">France</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div>
          <input
            type="submit"
            disabled={ status === STATUS.SUBMITTING }
            className="btn btn-primary"
            value="Save Shipping Info"
          />
        </div>
      </form>
    </>
  );
}
