import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Movie, MovieDetail } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  public errorMessage: string;
  private searched: string;
  public movie: MovieDetail;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService
  ) {}

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get("id");
    this.searched = this._route.snapshot.paramMap.get("searched");
    console.log("this.searched: ", this.searched);
    if (param) {
      //const id = +param;
      const id = param;
      this.getMovieDetal(id);
    }
  }

  public onBack(): void {
    this._router.navigate(["/movies-list"], {
      queryParams: { searched: this.searched }
    });
  }

  private getMovieDetal(id: string): void {
    this._productService.getMovieDetail(id).subscribe(
      (movie: MovieDetail) => (this.movie = movie),
      error => (this.errorMessage = <any>error)
    );
  }
}
