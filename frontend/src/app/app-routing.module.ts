import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components here
import { HostListComponent } from './components/host-list/host-list.component';
import { HostDetailsComponent } from './components/host-details/host-details.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { GuestListComponent } from './components/guest-list/guest-list.component';
import { GuestDetailsComponent } from './components/guest-details/guest-details.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/hosts', pathMatch: 'full' }, // Default route to host list
  { path: 'hosts', component: HostListComponent },
  { path: 'hosts/:id', component: HostDetailsComponent },
  { path: 'properties', component: PropertyListComponent },
  { path: 'properties/:id', component: PropertyDetailsComponent },
  { path: 'guests', component: GuestListComponent },
  { path: 'guests/:id', component: GuestDetailsComponent },
  { path: 'bookings', component: BookingListComponent },
  { path: 'bookings/:id', component: BookingDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
