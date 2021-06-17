import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {HomeComponent} from './components/common/home/home.component';
import {LoginComponent} from './components/common/login/login.component';
import {NavComponent} from './components/common/nav/nav.component';
import {RegisterComponent} from './components/common/register/register.component';
import {HttpInterceptorService} from './interceptors/http-interceptor.service';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HotelEditorComponent } from './components/admin/hotel-editor/hotel-editor.component';
import { TicketEditorComponent } from './components/admin/ticket-editor/ticket-editor.component';
import { CityBreakEditorComponent } from './components/admin/city-break-editor/city-break-editor.component';
import { HotelBookingComponent } from './components/hotel-booking/hotel-booking.component';
import { TicketBookingComponent } from './components/ticket-booking/ticket-booking.component';
import { CityBreakBookingComponent } from './components/city-break-booking/city-break-booking.component';
import { UnauthorizedComponent } from './components/common/unauthorized/unauthorized.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    OrderHistoryComponent,
    CartComponent,
    ProfileComponent,
    HotelEditorComponent,
    TicketEditorComponent,
    CityBreakEditorComponent,
    HotelBookingComponent,
    TicketBookingComponent,
    CityBreakBookingComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
