import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HostListComponent } from './components/host-list/host-list.component';
import { HostDetailsComponent } from './components/host-details/host-details.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { GuestListComponent } from './components/guest-list/guest-list.component';
import { GuestDetailsComponent } from './components/guest-details/guest-details.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HostListComponent,
    HostDetailsComponent,
    PropertyListComponent,
    PropertyDetailsComponent,
    GuestListComponent,
    GuestDetailsComponent,
    BookingListComponent,
    BookingDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
