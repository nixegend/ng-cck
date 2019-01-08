import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { reducers } from './app.reducers';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component'

import { environment } from '../environments/environment';
import { TestPageComponent } from './test-page/test-page.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    NotFoundComponent,
    TestPageComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }