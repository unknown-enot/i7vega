import { ScopesService } from './services/scopes.service';
import { InterceptorService } from './services/interceptor.service';
import { RolesAuthGuard } from './Roles.guard';
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
import { RoleGuard } from './role.guard';
import { NotAuthorizedComponent } from './components/notauthorized.component';
import { ChartModule } from 'angular2-chartjs';


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
    ChartModule,
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
      { path: 'vehicles/new', 
        component: VehicleFormComponent, 
        canActivate: [AuthGuard, RolesAuthGuard], 
        data: { 
          expectedRole: 'Admin'
      } },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuard] },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'admin', component: AdminComponent, 
      canActivate: [AuthGuard, RolesAuthGuard], 
      data: { 
        expectedRole: 'Admin'
      }},

      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'notauthorized', component: NotAuthorizedComponent },
      { path: '**', redirectTo: 'vehicles' }

    ])

  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    AuthService,
    VehicleService,
    AuthGuard,
    RoleGuard,
    RolesAuthGuard,
    PhotoService,
    ScopesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
