
export const LOGIN_REQUEST = 'LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'LOGIN_FAILURE' as const;

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST' as const;
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS' as const;
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE' as const;

export const LOGOUT = 'LOGOUT' as const;

export type AuthActionTypes =
  | typeof LOGIN_REQUEST
  | typeof LOGIN_SUCCESS
  | typeof LOGIN_FAILURE
  | typeof SIGNUP_REQUEST
  | typeof SIGNUP_SUCCESS
  | typeof SIGNUP_FAILURE
  | typeof LOGOUT;
