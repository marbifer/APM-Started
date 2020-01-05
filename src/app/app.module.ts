import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";

const modules = [
  NgbModule,
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  MatToolbarModule,
];

@NgModule({
  imports: [
    modules,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    AppRoutingModule
  ],
  exports: [AppRoutingModule], 
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

