import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';

import { routing } from './app.routing';
import { reducers } from './app.reducers';

import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorInterceptor } from './auth/error.interceptor';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { NotFoundComponent } from './not-found/not-found.component'
import { TestPageComponent } from './test-page/test-page.component';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    // as main store
    StoreModule.forRoot(reducers),
    RouterModule.forRoot(routing),
    // Connects RouterModule with StoreModule
    StoreRouterConnectingModule.forRoot(),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  declarations: [
    SignInFormComponent,
    MainLayoutComponent,
    HomeComponent,
    AdminComponent,
    SignUpFormComponent,
    NotFoundComponent,
    TestPageComponent],
    entryComponents: [SignInFormComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [MainLayoutComponent]
})

export class AppModule { }