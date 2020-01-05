import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import * as moviesActions from "../state/movies.actions";
import { MoviesList } from "./../product";
import { ProductService } from "../product.service";

@Injectable()
export class MoviesEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  loadMovies$: Observable<Action> = this.actions$.pipe(
    ofType<moviesActions.LoadMovies>(
      moviesActions.MoviesActionTypes.LOAD_MOVIES
    ),
    mergeMap((action: moviesActions.LoadMovies) =>
      this.productService.getFilmsData$(action.payload.search).pipe(
        map(
          (movies: MoviesList) => new moviesActions.LoadMoviesSuccess(movies)
        ),
        catchError(err => of(new moviesActions.LoadMoviesFail(err)))
      )
    )
  );
}
