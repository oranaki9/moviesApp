import { IAuthState, AUTH_INITIAL_STATE, authReducer } from "./auth/store";
import { combineReducers } from "redux";
import {
  IHomeMoviesState,
  HOME_MOVIES_INITIAL_STATE,
  homeMoviesReducer
} from "./components/home/store";


export interface IAppState {
  auth: IAuthState;
  homeMovies: IHomeMoviesState;
}
export const INITIAL_STATE: IAppState = {
  auth: AUTH_INITIAL_STATE,
  homeMovies: HOME_MOVIES_INITIAL_STATE

};
export const rootReducer = combineReducers({
  auth: authReducer,
  homeMovies: homeMoviesReducer
});
