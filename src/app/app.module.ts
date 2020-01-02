import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';
import { ProductListComponent } from './products/product-list.component';

const modules = [
  NgbModule,
  BrowserModule,
  HttpClientModule,
  MatToolbarModule,
  ProductModule
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    modules,
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        { path: 'movies-list', component: ProductListComponent },
        { path: '', redirectTo: 'welcome', pathMatch: 'full'},
        { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
