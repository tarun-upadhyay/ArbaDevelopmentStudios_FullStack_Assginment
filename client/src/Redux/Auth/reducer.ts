//import { cookieData } from "../../Utils/Cookie-Data";
import * as types from "./actionTypes";
//import { User } from "../../types"; // Assuming you have a User type defined

interface State {
  //   cred: User;
  // isAuth: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState: State = {
  //cred: cookieData("getUserDetail") || {},
  //isAuth: cookieData("auth") || false,
  isAdmin: false,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const reducer = (oldState: State = initialState, action: any): State => {
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
        // cred: payload,
        isLoading: false,
        isError: false,
        // isAuth: true,
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
        //  cred: payload,
        isLoading: false,
        // isAuth: true,
        isError: false,
        errorMessage: "",
      };
    case types.SIGNUP_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    default:
      return oldState;
  }
};
