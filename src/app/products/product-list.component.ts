import { Component, OnInit, OnDestroy } from "@angular/core";

import { Movie, MoviesList } from "./product";
import { ProductService } from "./product.service";

import { Router, ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { Store, select  } from "@ngrx/store";
import { Observable } from "rxjs";
import * as moviesActions from "./state/movies.actions";
import * as fromMovies from "./state/movies.reducer";


@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
  public pageTitle: string = "Movies List";
  public errorMessage: string;
  public filteredMovies: Movie[];
  public loading = false;

  movies$ : Observable<MoviesList>;
  test:MoviesList;

  private _movieSearched: string;
  private subs: Subscription;

  get movieSearched(): string {
    return this._movieSearched;
  }
  set movieSearched(value: string) {
    this._movieSearched = value;
    this.loading = true;
    this.errorMessage = null;
    this.performSearch(this.movieSearched.toLocaleLowerCase());
  }

  constructor(
    private _productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.activeRouteInit();

    this.movies$ = this.store.pipe(select(fromMovies.getMovies));

    this.movies$.subscribe(state => {
     
      this.test = state;

      console.log('state: ', this.test)
    });
  }

  private activeRouteInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.searched) {
        this.movieSearched = params.searched;
      }
    });
  }

  private performSearch(dataSearched: string): void {
    this.subs = this._productService.getFilmsData$(dataSearched).subscribe(
      (moviesData: MoviesList) => {
        console.log("ver", moviesData);
        this.loading = false;
        if (moviesData.Response === "False" && this.movieSearched) {
          this.errorMessage = moviesData.Error;
          this.filteredMovies = null;
        } else if (moviesData.Response === "False" && !this.movieSearched) {
          this.errorMessage = "Please search a movie";
          this.filteredMovies = null;
        } else {
          this.errorMessage = null;
          this.filteredMovies = moviesData.Search;
          const queryParams: Params = { searched: this.movieSearched };
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: "merge"
          });

          this.store.dispatch(new moviesActions.LoadMovies({search: dataSearched}));

        }
      },
      error => (this.errorMessage = <any>error)
    );
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
