import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PropertyComponent } from './components/property/property.component';
import { BookingComponent } from './components/booking/booking.component';
import { HostComponent } from './components/host/host.component';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'host', component: HostComponent },
  { path: 'post', component: PostComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Add a wildcard route for handling unknown URLs
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
