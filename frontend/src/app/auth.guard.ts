import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the user is logged in and has a valid role
    const userRole = localStorage.getItem('userRole');

    if (!userRole) {
      // If not logged in, redirect to the home page or login page
      this.router.navigate(['/home']); // Replace '/home' with the appropriate home page URL
      alert('Please log in to access this page.');
      return false;
    }

    const isGuest = userRole === 'guest';
    const isHost = userRole === 'host';

    if (state.url.includes('/booking') || state.url.includes('/preview/') && isGuest) {
      // Allow access to the booking route for guests
      return true;
    } else if (
      (state.url.includes('/property-admin') || state.url.includes('/property/') || state.url.includes('/property/edit/')) &&
      isHost
    ) {
      // Allow access to the property-admin, property/:id, and property/edit/:id routes for hosts
      return true;
    } else {
      // If the user has an unknown role or is not authorized for the current route, redirect to the home page or display an alert
      this.router.navigate(['/home']); // Replace '/home' with the appropriate home page URL
      alert('You are not authorized to access this page.');
      return false;
    }
  }
}
