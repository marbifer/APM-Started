import { Action } from "@ngrx/store";
import { Movie, MoviesList } from "../product";


export enum MoviesActionTypes {
    LOAD_MOVIES = "[Movies] Load Movies",
    LOAD_MOVIES_SUCCESS = "[Movies] Load Movies Success",
    LOAD_MOVIES_FAIL = "[Movies] Load Movies Fail",
    
  }
  
  export class LoadMovies implements Action {
    readonly type = MoviesActionTypes.LOAD_MOVIES;

    constructor(public payload) {}
  }
  
  export class LoadMoviesSuccess implements Action {
    readonly type = MoviesActionTypes.LOAD_MOVIES_SUCCESS;
  
    constructor(public payload: MoviesList) {}
  }
  
  export class LoadMoviesFail implements Action {
    readonly type = MoviesActionTypes.LOAD_MOVIES_FAIL;
  
    constructor(public payload: string) {}
  }
  
  
  
  export type Action =
    | LoadMovies
    | LoadMoviesSuccess
    | LoadMoviesFail;