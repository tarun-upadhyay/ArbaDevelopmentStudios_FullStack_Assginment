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
    dispatch({ type: types.LOGIN_SUCCESS, payload: data.user });
    return data.user;
  } catch (err) {
    dispatch({ type: types.LOGIN_FAILURE });
    return err;
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
  window.location.reload()
  fetch("/api/v1/auth/logout")
    .then((res) => res.json())
    .catch((err) => new Error(err));
};
export const handleTc = (params) => (dispatch) => dispatch({ type: types.TC });
export const deleteTC = (params) => (dispatch) =>
  dispatch({ type: types.DELETETC });
