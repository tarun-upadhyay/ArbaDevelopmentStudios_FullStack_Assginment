import * as types from "./actionTypes";
const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};
export const reducer = (oldState = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.ADDTOCART:
      const existingItemIndex = oldState.cart.findIndex(
        (item) => item._id === payload._id
      );
      let updatedCart;
      if (existingItemIndex !== -1) {
        updatedCart = [...oldState.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
      } else {
        updatedCart = [...oldState.cart, { ...payload, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...oldState,
        cart: updatedCart,
      };
    case types.DECREMENTCOUNT:
      const itemIndex = oldState.cart.findIndex(
        (item) => item._id === payload._id
      );
      if (itemIndex !== -1 && oldState.cart[itemIndex].quantity >= 1) {
        const updatedItem = {
          ...oldState.cart[itemIndex],
          quantity: oldState.cart[itemIndex].quantity - 1,
        };
        let updatedCart;
        if (updatedItem.quantity === 0) {
          updatedCart = [...oldState.cart];

          updatedCart.splice(itemIndex, 1);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        } else {
          updatedCart = [...oldState.cart];
          updatedCart[itemIndex] = updatedItem;
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }

        return {
          ...oldState,
          cart: updatedCart,
        };
      }
      return oldState;
    default:
      return oldState;
  }
};
