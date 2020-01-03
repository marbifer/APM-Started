import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { Product } from "./product";

@Injectable()
export class ProductService {
  private _productUrl = "./api/products/products.json";
  private url = "http://www.omdbapi.com/?apikey=f79aeba3&s=People";
  private urlSearch = "http://www.omdbapi.com/?apikey=f79aeba3&s=";
  private urlMovieDetal = "http://www.omdbapi.com/?apikey=f79aeba3&i=";

  constructor(private _http: HttpClient) {}

  public getFilmsData(): Observable<any>  {
    return this._http.get(this.url).pipe(
      tap(data => console.log("film: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public getFilmsData1(dataSearched): Observable<any>  {
    return this._http.get(this.urlSearch + dataSearched).pipe(
      tap(data => console.log("film: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this._productUrl).pipe(
     // tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  queryDetail(id): Observable<any> {
    return this._http.get(this.urlMovieDetal  + id).pipe(
      tap(data => console.log("queryDetail: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getMovieDetail(id: string): Observable<any> {
    return this.queryDetail(id).pipe(
      map((products) => products))
    ;
  }

  /* getProduct(id: number): Observable<Product> {
    return this.getProducts().pipe(
      map((products: Product[]) => products.find(p => p.productId === id))
    );
  } */

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = "";
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
