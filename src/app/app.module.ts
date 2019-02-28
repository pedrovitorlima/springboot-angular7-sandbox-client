import { AuthService } from './shared/auths/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CarListComponent } from './car-list/car-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { TokenStorage } from './shared/auths/token.storage';

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [TokenStorage, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
