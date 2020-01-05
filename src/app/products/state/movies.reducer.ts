import * as moviesActions from "./movies.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { Movie, MoviesList } from "../product";
import * as fromRoot from "../../state/app-state";

export interface MoviesState {
  movies: MoviesList ;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  movies: MoviesState;
}

export const initialState: MoviesState = {
    movies: null,
    loading: false,
    loaded: false,
    error: ''
};

export function moviesReducer(
  state = initialState,
  action: moviesActions.Action
): MoviesState {
  switch (action.type) {
    case moviesActions.MoviesActionTypes.LOAD_MOVIES: {
        return  {
          ...state,
          loading: true,
        }
       
    }
    case moviesActions.MoviesActionTypes.LOAD_MOVIES_SUCCESS: {
      return  {
        ...state,
        loading: false,
        loaded: true,
        movies: action.payload
      }
    }
    case moviesActions.MoviesActionTypes.LOAD_MOVIES_FAIL: {
      return {
        ...state,
        movies: null,
        loading: false,
        loaded: false,
        error: action.payload
      }
    }


    default: {
      return state;
    }
  }
}

const getMoviesFeatureState = createFeatureSelector<MoviesState>(
  "movies"
);

export const getMovies = createSelector(
 getMoviesFeatureState,
 (state: MoviesState) => state.movies
);

export const getMoviesLoading = createSelector(
  getMoviesFeatureState,
  (state: MoviesState) => state.loading
);

export const getMoviesLoaded = createSelector(
  getMoviesFeatureState,
  (state: MoviesState) => state.loaded
);

export const getError = createSelector(
  getMoviesFeatureState,
  (state: MoviesState) => state.error
);


