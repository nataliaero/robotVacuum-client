import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RobotVacuumComponent } from './robot-vacuum/robot-vacuum.component';
import { Top10Component } from './top10/top10.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthInterceptor, UnauthorizedInterceptor } from './auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    RobotVacuumComponent,
    Top10Component,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UnauthorizedInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
