import { Component, OnInit, OnDestroy } from "@angular/core";

import { MoviesList } from "./product";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
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

  public loading = false;

  public movies$: Observable<MoviesList>;
  public moviesError$: Observable<any>;
  public moviesLoading$: Observable<any>;
  

  private _movieSearched: string;
  private moviesSub: Subscription;

  get movieSearched(): string {
    return this._movieSearched;
  }
  set movieSearched(value: string) {
    this._movieSearched = value;
    this.loading = true;
    this.errorMessage = null;

    this.store.dispatch(
      new moviesActions.LoadMovies({
        search: this.movieSearched.toLocaleLowerCase()
      })
    );
   
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.activeRouteInit();

    this.movies$ = this.store.pipe(select(fromMovies.getMovies));
    this.moviesError$ = this.store.pipe(select(fromMovies.getError));
    this.moviesLoading$ = this.store.pipe(select(fromMovies.getMoviesLoading));

    this.moviesSub = this.movies$.subscribe((moviesData: MoviesList) => {
      if(moviesData){
        const queryParams: Params = { searched: this.movieSearched };
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: queryParams,
          queryParamsHandling: "merge"
        });
      }
      
    });
  }

  private activeRouteInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.searched) {
        this.movieSearched = params.searched;
      }
    });
  }

  

  ngOnDestroy() {
    this.moviesSub.unsubscribe();
  }
}
