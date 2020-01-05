import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { EffectsModule, Actions } from "@ngrx/effects";
import { ProductListComponent } from "./product-list.component";
import { ProductDetailComponent } from "./product-detail.component";
import { ProductService } from "./product.service";
import { StoreModule } from "@ngrx/store";
import { moviesReducer } from "./state/movies.reducer";
import { MoviesEffect } from "./state/movies.effects";

const moviesRoutes: Routes = [
  {
    path: "",
    component: ProductListComponent
  },
  {
    path: "detail/:id/:searched",
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(moviesRoutes),
    StoreModule.forFeature("movies", moviesReducer),
    EffectsModule.forFeature([MoviesEffect])
  ],
  declarations: [ProductListComponent, ProductDetailComponent],
  providers: [ProductService]
})
export class ProductModule {}
