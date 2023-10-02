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

  const getErrors = (address) => {
    const result = {}
    if (!address.city) result.city = "City is required";
    if (!address.country) result.country = "Country is required";
    return result;
  }
  const error = getErrors(address);

  const isValid = Object.keys(error).length === 0;

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
    if (isValid) {
      try {
        await saveShippingAddress(address);
        emptyCart();
        setStatus(STATUS.COMPLETED);
      } catch (e) {
        setFormError(e);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }



  if (formError) throw formError;

  if (status === STATUS.COMPLETED) {
    return (<h1>Thanks for shopping</h1>)
  }

  return (
    <>
      <h1>Shipping Info</h1>
      { !isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors :</p>
          <ul>
            { Object.keys(error).map((key) => {
              return <li key={ key }>{ error[key] }</li>
            }) }
          </ul>
        </div>
      )
      }
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
