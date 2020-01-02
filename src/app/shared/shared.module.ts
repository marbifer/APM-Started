import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [
    StarComponent
  ],
  exports: [
    StarComponent,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
