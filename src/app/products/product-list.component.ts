import { Component, OnInit } from "@angular/core";

import { Movie, MoviesList } from "./product";
import { ProductService } from "./product.service";

import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  public pageTitle: string = "Movies List";
  public errorMessage: string;
  public filteredMovies: Movie[];
  public loading = false;

  private _movieSearched: string;

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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRouteInit();
  }

  private activeRouteInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.searched) {
        this.movieSearched = params.searched;
      }
    });
  }

  private performSearch(dataSearched: string): void {
    this._productService.getFilmsData$(dataSearched).subscribe(
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
        }
      },
      error => (this.errorMessage = <any>error)
    );
  }
}
