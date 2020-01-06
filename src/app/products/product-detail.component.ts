import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { MovieDetail } from "./product";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as moviesActions from "./state/movies.actions";
import * as fromMovies from "./state/movies.reducer";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  public errorMessage: string;
  public movie: MovieDetail;
  public hideImage = false;
  private searched: string;

  public movieDetail$: Observable<MovieDetail>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.hideImage = false;
    const param = this._route.snapshot.paramMap.get("id");
    this.searched = this._route.snapshot.paramMap.get("searched");

    if (param) {
      const id = param;
      this.store.dispatch(new moviesActions.LoadMovieDetail({ search: id }));
    }
    this.movieDetail$ = this.store.pipe(select(fromMovies.getMovieDetail));
  }

  public onBack(): void {
    this._router.navigate(["/movies-list"], {
      queryParams: { searched: this.searched }
    });
  }
}
