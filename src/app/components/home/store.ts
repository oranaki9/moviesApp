import { ShortMovie } from "../home/movies-crousel/ShortMovie.interface";

export interface IHomeMoviesState {
  randomMovies: ShortMovie[];
  favoriteMovies: ShortMovie[];
  favoriteMoviesIds: string[];
  isLoading: boolean;
}
export const HOME_MOVIES_INITIAL_STATE = {
  randomMovies: [],
  favoriteMovies: [],
  favoriteMoviesIds: [],
  isLoading: false
};
export function homeMoviesReducer(
  state: IHomeMoviesState = HOME_MOVIES_INITIAL_STATE,
  action
) {
  switch (action.type) {
    case "FATCH_MOVIES_REQUEST": {
      return {
        ...state,
        isLoading: true
      };
    }
    case "FATCH_RANDOM_MOVIES_SUCCESS":
      return {
        ...state,
        randomMovies: action.payload,
        isLoading: false
      };
    case "FETCH_FAVORIE_MOVIES_SUCCESS": {
      console.log(action.payload);

      return {
        ...state,
        favoriteMovies: action.payload
      };
    }
    case "FETCH_FAVORITE_MOVIES_IDS_SUCCESS": {
      return { ...state, favoriteMoviesIds: action.payload, isLoading: false };
    }
    case "ADD_MOVIE": {
      return {
        ...state,
        favoriteMoviesIds: state.favoriteMoviesIds.concat(action.payload)
      };
    }
    case "DELETE_FAVORITE_MOVIE": {
      return {
        ...state,
        favoriteMovies: state.favoriteMovies.filter(
          favorite => favorite.imdbID !== action.payload
        ),
        favoriteMoviesIds: state.favoriteMoviesIds.filter(
          favoriteId => favoriteId !== action.payload
        )
      };
    }
    case "CLEAR_RANDOM_MOVIES": {
      return {
        ...state,
        randomMovies: []
      };
    }

    default:
      return state;
  }
}
