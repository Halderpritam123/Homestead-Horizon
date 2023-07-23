import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PropertyComponent } from './components/property/property.component';
import { BookingComponent } from './components/booking/booking.component';
import { HostComponent } from './components/host/host.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { GuestComponent } from './components/guest/guest.component';
import { HttpClientModule } from '@angular/common/http';
import { PropertyAdminComponent } from './components/property-admin/property-admin.component';
// import { SinglePropertyComponent } from './single-property/single-property.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyEditComponent } from './property-edit/property-edit.component';
import { AuthGuard } from './auth.guard';
import { PreviewComponent } from './preview/preview.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PropertyComponent,
    BookingComponent,
    HostComponent,
    FooterComponent,
    GuestComponent,
    PropertyAdminComponent,
    // SinglePropertyComponent,
    PropertyDetailComponent,
    PropertyEditComponent,
    PreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
