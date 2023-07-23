import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { PropertyComponent } from './components/property/property.component';
import { BookingComponent } from './components/booking/booking.component';
import { HostComponent } from './components/host/host.component';
import { GuestComponent } from './components/guest/guest.component';
import { PropertyAdminComponent } from './components/property-admin/property-admin.component';
// import { SinglePropertyComponent } from './single-property/single-property.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyEditComponent } from './property-edit/property-edit.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] }, // Protected for guest only
  { path: 'preview/:id', component: PreviewComponent, canActivate: [AuthGuard] }, // Protected for guest only
  { path: 'host', component: HostComponent },
  { path: 'guest', component: GuestComponent },
  { path: 'property-admin', component: PropertyAdminComponent, canActivate: [AuthGuard] }, // Protected for host only
  { path: 'property/:id', component: PropertyDetailComponent, canActivate: [AuthGuard] }, // Protected for host only
  { path: 'property/edit/:id', component: PropertyEditComponent, canActivate: [AuthGuard] }, // Protected for host only
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Add a wildcard route for handling unknown URLs
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
