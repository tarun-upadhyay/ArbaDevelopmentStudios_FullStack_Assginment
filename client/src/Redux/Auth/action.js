import * as types from "./actionTypes";

export const login = (params) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  try {
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || "Login failed"); // Throw an error with the message from the API response or a default message
    }

    dispatch({ type: types.LOGIN_SUCCESS, payload: data.user });
    return data.user;
  } catch (err) {
    dispatch({ type: types.LOGIN_FAILURE });
    throw err; // Re-throw the error to be caught by the caller
  }
};

export const register = (params) => (dispatch) => {
  dispatch({ type: types.SIGNUP_REQUEST });
};
export const profileInfo = (params) => async (dispatch) => {
  dispatch({ type: types.PROFILE_REQUEST });
  try {
    let response = await fetch("/api/v1/auth/profile");
    let data = await response.json();
    if (!response.ok) throw new Error("No found user");

    return dispatch({ type: types.PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    return dispatch({ type: types.PROFILE_FAILURE });
    throw error;
  }
};
export const logout = (params) => (dispatch) => {
  dispatch({ type: types.LOGOUT });
  localStorage.removeItem("t&CAccepted");
  localStorage.removeItem("cart");
  fetch("/api/v1/auth/logout")
    .then((res) => res.json())
    .then(() => {
      return window.location.reload();
    })
    .catch((err) => new Error(err));
};
export const handleTc = (params) => (dispatch) => dispatch({ type: types.TC });
export const deleteTC = (params) => (dispatch) =>
  dispatch({ type: types.DELETETC });
