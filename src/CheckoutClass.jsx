import React from "react";
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
};

export default class Checkout extends React.Component {
  // Attribute
  state = {
    address: emptyAddress,
    status: STATUS.IDLE,
    formError: null,
    touched: {},
  };

  isValid() {
    const error = this.getErrors(this.state.address);
    return Object.keys(error).length === 0;
  };

  handleChange = (e) => {
    e.persist(); // persist the event
    this.setState((state) => {
      return {
        address: {
          ...state.address,
          [e.target.id]: e.target.value,
        },
      };
    });
  };

  handleBlur = (event) => {
    event.persist();
    this.setState((state) => {
      return { touched: { ...state.touched, [event.target.id]: true } };
    })
  };


  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ status: STATUS.SUBMITTING });
    if (this.isValid()) {
      try {
        await saveShippingAddress(this.state.address);
        this.props.dispatch({ type: "empty" });
        this.setState({ status: STATUS.COMPLETED });
      } catch (e) {
        this.setState({ formError: e });
      }
    } else {
      this.setState({ status: STATUS.SUBMITTED });
    }
  };

  getErrors(address) {
    const result = {}
    if (!address.city) result.city = "City is required";
    if (!address.country) result.country = "Country is required";
    return result;
  };


  render() {
    const { status, formError, touched, address } = this.state;
    //Derived state
    const error = this.getErrors(this.state.address);

    if (formError) throw formError;

    if (status === STATUS.COMPLETED) {
      return (<h1>Thanks for shopping</h1>)
    }

    return (
      <>
        <h1>Shipping Info</h1>
        { !this.isValid() && status === STATUS.SUBMITTED && (
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
        <form onSubmit={ this.handleSubmit }>
          <div>
            <label htmlFor="city">City</label>
            <br />
            <input
              id="city"
              type="text"
              value={ address.city }
              onBlur={ this.handleBlur }
              onChange={ this.handleChange }
            />
            <p role="alert">
              { (touched.city || status === STATUS.SUBMITTED) && error.city }
            </p>
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <br />
            <select
              id="country"
              value={ address.country }
              onBlur={ this.handleBlur }
              onChange={ this.handleChange }
            >
              <option value="">Select Country</option>
              <option value="Canada">Canada</option>
              <option value="China">China</option>
              <option value="India">India</option>
              <option value="France">France</option>
              <option value="USA">USA</option>
            </select>

            <p role="alert">
              { (touched.country || status === STATUS.SUBMITTED) && error.country }
            </p>
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
}
