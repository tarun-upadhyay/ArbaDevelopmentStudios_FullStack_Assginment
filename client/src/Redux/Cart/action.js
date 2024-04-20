import * as types from "./actionTypes";
export const addToCart = (params) => (dispatch) => {
  return dispatch({ type: types.ADDTOCART, payload: params });
};

export const deleteToCart = (params) => (dispatch) => {
    return dispatch({ type: types.DECREMENTCOUNT, payload: params });
  };
  