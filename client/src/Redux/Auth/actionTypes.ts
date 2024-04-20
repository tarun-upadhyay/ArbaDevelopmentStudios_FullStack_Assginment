export const LOGIN_REQUEST = "LOGIN_REQUEST" as const;
export const LOGIN_SUCCESS = "LOGIN_SUCCESS" as const;
export const LOGIN_FAILURE = "LOGIN_FAILURE" as const;

export const SIGNUP_REQUEST = "SIGNUP_REQUEST" as const;
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS" as const;
export const SIGNUP_FAILURE = "SIGNUP_FAILURE" as const;

export const PROFILE_REQUEST = "PROFILE_REQUEST" as const;
export const PROFILE_SUCCESS = "PROFILE_SUCCESS" as const;
export const PROFILE_FAILURE = "PROFILE_FAILURE" as const;

export const LOGOUT = "LOGOUT" as const;
export const TC = "TC" as const;
export const DELETETC = "DELETETC" as const;

export type AuthActionTypes =
  | typeof LOGIN_REQUEST
  | typeof LOGIN_SUCCESS
  | typeof LOGIN_FAILURE
  | typeof SIGNUP_REQUEST
  | typeof SIGNUP_SUCCESS
  | typeof SIGNUP_FAILURE
  | typeof LOGOUT
  | typeof PROFILE_REQUEST
  | typeof PROFILE_SUCCESS
  | typeof PROFILE_FAILURE
  | typeof TC
  | typeof DELETETC;
