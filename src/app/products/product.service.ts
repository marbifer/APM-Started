import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { MoviesList, MovieDetail } from "./product";

@Injectable()
export class ProductService {
  private urlSearch = "http://www.omdbapi.com/?apikey=f79aeba3&s=";
  private urlMovieDetail = "http://www.omdbapi.com/?apikey=f79aeba3&i=";

  constructor(private _http: HttpClient) {}

  public getFilmsData$(dataSearched): Observable<MoviesList> {
    return this._http.get<MoviesList>(this.urlSearch + dataSearched).pipe(
      tap(data => console.log("film: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public getMovieDetail(id: string): Observable<MovieDetail> {
    return this.queryDetail(id).pipe(map((products: MovieDetail) => products));
  }

  private queryDetail(id): Observable<MovieDetail> {
    return this._http.get<MovieDetail>(this.urlMovieDetail + id).pipe(
      tap(data => console.log("queryDetail: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    let errorMessage = "";
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
