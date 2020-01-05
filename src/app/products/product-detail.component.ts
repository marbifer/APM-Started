import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Movie, MovieDetail } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as moviesActions from "./state/movies.actions";
import * as fromMovies from "./state/movies.reducer";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public errorMessage: string;
  public movie: MovieDetail;
  private searched: string;

  movieDetail$: Observable<MovieDetail>;
  testDetail;

  private subs: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get("id");
    this.searched = this._route.snapshot.paramMap.get("searched");
    console.log("this.searched: ", this.searched);
    if (param) {
      //const id = +param;
      const id = param;
      this.getMovieDetal(id);
      this.store.dispatch(new moviesActions.LoadMovieDetail({ search: id }));
    }

    this.movieDetail$ = this.store.pipe(select(fromMovies.getMovieDetail));
    this.movieDetail$.subscribe(state => {
      this.testDetail = state;

      console.log("state Detail: ", this.testDetail);
    });
  }

  public onBack(): void {
    this._router.navigate(["/movies-list"], {
      queryParams: { searched: this.searched }
    });
  }

  private getMovieDetal(id: string): void {
    this.subs = this._productService.getMovieDetail(id).subscribe(
      (movie: MovieDetail) => (this.movie = movie),
      error => (this.errorMessage = <any>error)
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe;
  }
}
