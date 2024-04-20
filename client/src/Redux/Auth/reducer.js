import { cookieData } from "../../Utils/Cookie-Data";
import * as types from "./actionTypes";
const initialState = {
  isAuth: (await cookieData("auth")) || false,
  isAdmin: false,
  isLoading: false,
  isError: false,
  errorMessage: "",
  isTermsAccepted: localStorage.getItem("t&CAccepted") || false,
  userDetails: {
    fullName: "",
    userName: "",
    avatar: "",
    email: "",
  },
};
export const reducer = (oldState = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOGIN_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        isAuth: payload,
      };
    case types.LOGIN_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };
    case types.SIGNUP_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...oldState,

        isLoading: false,
        isAuth: payload,
        isError: true,
        errorMessage: "",
      };
    case types.SIGNUP_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    case types.LOGOUT:
      localStorage.removeItem("loggedUser");
      return {
        ...oldState,

        isAuth: false,
        isAdmin: false,
        isLoading: false,
        isError: false,
        errorMessage: "",
      };
    case types.PROFILE_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };
    case types.PROFILE_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        userDetails: payload,
      };
    case types.PROFILE_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };
    case types.TC:
      localStorage.setItem("t&CAccepted", "true");
      return {
        ...oldState,
        isTermsAccepted: true,
      };
    case types.DELETETC:
      localStorage.removeItem("t&CAccepted");
      return {
        ...oldState,
        isTermsAccepted: false,
      };
    default:
      return oldState;
  }
};
