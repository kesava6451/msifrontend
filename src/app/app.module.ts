// app.module.ts or login.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  // <-- Import CommonModule
import { FormsModule } from '@angular/forms';    // <-- Import FormsModule
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,  // <-- Add CommonModule here
    FormsModule    // <-- Add FormsModule here for ngModel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
