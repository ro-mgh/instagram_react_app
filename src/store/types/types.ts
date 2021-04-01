// auth reducer

type blankUser = {};
test;
export interface Auth {
  authMsgError?: string;
  authMsgSuccess?: string;
  user?:
    | {
        uid: string;
        displayName: string;
        photoURL: string;
        email: string;
        emailVerified: boolean;
        phoneNumber: null;
        isAnonymous: boolean;
        tenantId: null;
        providerData: {
          uid: string;
          displayName: string;
          photoURL: string;
          email: string;
          phoneNumber: null;
          providerId: string;
        }[];
        apiKey: string;
        appName: string;
        authDomain: string;
        stsTokenManager: {
          apiKey: string;
          refreshToken: string;
          accessToken: string;
          expirationTime: number;
        };
        redirectEventId: null;
        lastLoginAt: string;
        createdAt: string;
        multiFactor: {
          enrolledFactors: [];
        };
      }
    | blankUser;
}

interface AuthAction {
  type: string;
  payload: Auth;
}

export type AuthType = AuthAction;

//error reducer
export interface ErrorInitialState {
  error: string;
}

interface ErrorAction {
  type: string;
  payload: ErrorInitialState;
}

export type ErrorType = ErrorAction;

// getData reducer

export interface DataInitialState {
  users: Record<string, unknown>;
}

interface DataAction {
  type: string;
  payload: DataInitialState;
}

export type DataType = DataAction;
