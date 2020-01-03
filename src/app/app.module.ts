import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
/* Feature Modules */


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
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

