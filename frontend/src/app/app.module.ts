import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PropertyComponent } from './components/property/property.component';
import { BookingComponent } from './components/booking/booking.component';
import { HostComponent } from './components/host/host.component';
import { PostComponent } from './components/post/post.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component'; 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PropertyComponent,
    BookingComponent,
    HostComponent,
    PostComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
