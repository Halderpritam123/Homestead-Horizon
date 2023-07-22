import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private http: HttpClient) { }

  async logout() {
    try {
      await this.http.post('/logout', {}).toPromise();
      // Logout successful, navigate to the home page
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error occurred during logout:', error);
      alert('An error occurred during logout. Please try again later.');
    }
  }

}
