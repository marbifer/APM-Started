import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { WelcomeComponent } from "./home/welcome.component";

import { SelectiveStrategy } from "./selective-strategy.service";

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: "welcome", component: WelcomeComponent },
        {
          path: "movies-list",
          data: { preload: false },
          loadChildren: () =>
            import("./products/product.module").then(m => m.ProductModule)
        },
        { path: "", redirectTo: "welcome", pathMatch: "full" }
      ],
      { enableTracing: true, preloadingStrategy: SelectiveStrategy }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
