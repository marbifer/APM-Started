import { Action } from "@ngrx/store";
import {
  MovieListSearch,
  MoviesList,
  MovieIdSearch,
  MovieDetail
} from "../product";

export enum MoviesActionTypes {
  LOAD_MOVIES = "[Movies] Load Movies",
  LOAD_MOVIES_SUCCESS = "[Movies] Load Movies Success",
  LOAD_MOVIES_FAIL = "[Movies] Load Movies Fail",

  LOAD_MOVIE_DETAIL = "[Movie Detal] Load Movie Detail",
  LOAD_MOVIE_DETAIL_SUCCESS = "[Movie Detal] Load Movie Detail Success",
  LOAD_MOVIE_DETAIL_FAIL = "[Movie Detal] Load Movie Detail Fail"
}

// Full list movies actions

export class LoadMovies implements Action {
  readonly type = MoviesActionTypes.LOAD_MOVIES;

  constructor(public payload: MovieListSearch) {}
}

export class LoadMoviesSuccess implements Action {
  readonly type = MoviesActionTypes.LOAD_MOVIES_SUCCESS;

  constructor(public payload: MoviesList) {}
}

export class LoadMoviesFail implements Action {
  readonly type = MoviesActionTypes.LOAD_MOVIES_FAIL;

  constructor(public payload: string) {}
}

//Detail movie actions

export class LoadMovieDetail implements Action {
  readonly type = MoviesActionTypes.LOAD_MOVIE_DETAIL;

  constructor(public payload: MovieIdSearch) {}
}

export class LoadMovieDetailSuccess implements Action {
  readonly type = MoviesActionTypes.LOAD_MOVIE_DETAIL_SUCCESS;

  constructor(public payload: MovieDetail) {}
}

export class LoadMovieDetailFail implements Action {
  readonly type = MoviesActionTypes.LOAD_MOVIE_DETAIL_FAIL;

  constructor(public payload: string) {}
}

export type Action =
  | LoadMovies
  | LoadMoviesSuccess
  | LoadMoviesFail
  | LoadMovieDetail
  | LoadMovieDetailSuccess
  | LoadMovieDetailFail;
