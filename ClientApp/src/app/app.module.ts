import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.components';
import { AuthService } from './services/auth.service';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle';
import { PaginationComponent } from './components/shared/pagination.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list';
import { SpinnerComponent } from './components/shared/spinner';
import { AppErrorHandler } from './app.error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import * as Sentry from "@sentry/browser";

import { VehicleService } from './services/vehicle.service';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PhotoService } from './services/photo.service';
import { AuthGuard } from './auth.guard';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AdminGuard } from './admin.guard';
import { NotAuthorizedComponent } from './components/notauthorized.component';

Sentry.init({
  dsn: "https://2362c8277a134c13bbf93b3fde92fd6c@o421718.ingest.sentry.io/5341916",
  // TryCatch has to be configured to disable XMLHttpRequest wrapping, as we are going to handle
  // http module exceptions manually in Angular's ErrorHandler and we don't want it to capture the same error twice.
  // Please note that TryCatch configuration requires at least @sentry/browser v5.16.0.
  integrations: [new Sentry.Integrations.TryCatch({
    XMLHttpRequest: false,
  })],
});

@NgModule({
  declarations: [
    AppComponent,   
    NavMenuComponent,
    AdminComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    SpinnerComponent,
    VehicleListComponent,
    ViewVehicleComponent,
    PaginationComponent,
    ProfileComponent,
    NotAuthorizedComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ 
      timeOut: 5000, 
      closeButton: true, 
      positionClass: 'toast-top-right',
      preventDuplicates: true }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'notauthorized', component: NotAuthorizedComponent },
      { path: '**', redirectTo: '' }

    ])

  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    AuthService,
    AuthGuard,
    AdminGuard,
    JwtHelperService,
    VehicleService,
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
