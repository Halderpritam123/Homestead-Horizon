import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private http: HttpClient) { }

  async logout() {
    // Show a confirmation SweetAlert before logging out
    const result = await Swal.fire({
      icon: 'question',
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    });

    // If user confirms the logout, proceed with logout functionality
    if (result.isConfirmed) {
      localStorage.removeItem('userRole');
      this.showSuccessAlert('Logout successful!');
      this.router.navigate(['/home']);
    }
  }

  // Function to show SweetAlert success notification
  showSuccessAlert(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }

}
