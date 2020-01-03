import { Component, OnInit } from "@angular/core";

import { Product } from "./product";
import { ProductService } from "./product.service";
import { Location } from "@angular/common";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Movies List";
  showImage: boolean = false;
  errorMessage: string;
  filmsData;
  filteredMovies;
  loading = false;

  _movieSearched;
  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredMovies = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.filmsData;
  }

  get movieSearched(): string {
    return this._movieSearched;
  }
  set movieSearched(value: string) {
    this._movieSearched = value;

    this.performSearch(this.movieSearched);
  }

  filteredProducts: Product[];
  products: Product[] = [];

  constructor(
    private _productService: ProductService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

   onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

  performSearch(dataSearched: string) {
    this.loading = true;
    this.errorMessage = null;
    dataSearched = dataSearched.toLocaleLowerCase();
    this._productService.getFilmsData1(dataSearched).subscribe(
      moviesData => {
        console.log('ver', moviesData)
        this.loading = false;
        if(moviesData.Response === "False"){
          this.errorMessage = moviesData.Error;
          this.filteredMovies = null;
        }else{
          this.errorMessage = null;
         
          this.filteredMovies = moviesData.Search;
          // this.location.replaceState("/searched/" + this.movieSearched);
  
          const queryParams: Params = { searched: this.movieSearched };
  
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: "merge" // remove to replace all query params by provided
          });
  
          // this.filteredMovies = this.filmsData;
        }
       
      },
      error => (this.errorMessage = <any>error)
    );
  }

  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();

    return this.filmsData.filter(
      movie => movie.Title.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  /*   toggleImage(): void {
    this.showImage = !this.showImage;
  } */

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.searched) {
        console.log("params,", params);
        this.movieSearched = params.searched;
      }
    });

    /* this._productService.getFilmsData().subscribe(
      moviesData => {
        this.filmsData = moviesData.Search;
        this.filteredMovies = this.filmsData;
      },
      error => (this.errorMessage = <any>error)
    );
 */
    this._productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => (this.errorMessage = <any>error)
    );
  }
}
