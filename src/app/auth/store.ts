
export interface IAuthState {
  isAuth: boolean;
  token: string;
  userId: string;
}
export const AUTH_INITIAL_STATE: IAuthState = {
  isAuth: false,
  token: "",
  userId: ""
};
export function authReducer(
  state: IAuthState = AUTH_INITIAL_STATE,
  action
): IAuthState {
  switch (action.type) {
    case "FETCH_AUTH": {
      return {
        ...state,
        isAuth: action.payload.isAuth,
        token: action.payload.token,
        userId: action.payload.userId
      };
    }
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        isAuth: true
      };
    }
    case "LOG_OUT": {
      return {
        ...state,
        token: "",
        userId: "",
        isAuth: false
      };
    }
    default:
      return state;
  }
}
