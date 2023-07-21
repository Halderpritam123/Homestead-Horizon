import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { HostEditComponent } from './host-edit/host-edit.component';
import { FormsModule } from '@angular/forms';


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
    BookingDetailsComponent,
    HostEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
