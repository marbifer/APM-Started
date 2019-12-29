import { Component, OnInit } from "@angular/core";

import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Movies List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string;
  filmsData;
  filteredMovies;
  
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

  filteredProducts: IProduct[];
  products: IProduct[] = [];

  constructor(private _productService: ProductService) {}

  /*  onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    } */

  performSearch(dataSearched: string) {
    dataSearched = dataSearched.toLocaleLowerCase();
        this._productService.getFilmsData1(dataSearched).subscribe(
            moviesData => {
              this.filteredMovies  = moviesData.Search;
             // this.filteredMovies = this.filmsData;
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
    this._productService.getFilmsData().subscribe(
      moviesData => {
        this.filmsData = moviesData.Search;
        this.filteredMovies = this.filmsData;
      },
      error => (this.errorMessage = <any>error)
    );

    this._productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => (this.errorMessage = <any>error)
    );
  }
}
