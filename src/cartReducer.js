import { produce } from "immer";

export default function cartReducer(cart, action) {

  switch (action.type) {
    case "empty":
      return [];
    case "updateQuantity": {
      // IMMER for immutable state
      const { quantity, sku } = action;
      return produce(cart, (draft) => {
        const index = cart.findIndex((i) => i.sku === sku);
        if (index > -1) {

          if (quantity === 0) {
            draft.splice(index, 1);
          } else {
            draft[index].quantity = quantity;
          }
        }

      });
      // const { sku, quantity } = action;
      // return quantity === 0 ? cart.filter((i) => i.sku !== sku)
      //   : cart.map(
      //     (i) => i.sku === sku ?
      //       { ...i, quantity }
      //       : i
      //   );
    }
    case "addToCart":
      const { id, sku } = action;
      const itemInCart = cart.find((i) => i.sku === sku);
      if (itemInCart) {
        return cart.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        return [...cart, { id, sku, quantity: 1 }];
      }
    default:
      throw new Error("Unhandled cartReducer action", action.type);
  }

};