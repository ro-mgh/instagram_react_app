export interface Signout {
  authMsgError: "";
  authMsgSuccess: "";
  user: {};
}

export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";

interface SignoutAction {
  type: typeof SIGNOUT_SUCCESS;
  payload: Signout;
}

export type AuthActionTypes = SignoutAction; // | DeleteMessageAction
