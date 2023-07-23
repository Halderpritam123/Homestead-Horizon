import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    const loginData = { email: this.email, password: this.password };
    this.http.post<any>('http://localhost:5000/login/guest', loginData).subscribe(
      (response: any) => {
        console.log(response);
        localStorage.setItem('userRole', 'guest'); // Set userRole to 'guest'
        this.errorMessage = '';
        // Show SweetAlert success notification
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login successful!',
        });
        this.router.navigate(['/property']); // Navigate to the property page
      },
      (error) => {
        console.error(error);
        this.errorMessage = error.error.error || 'An error occurred during login.';
        // Show SweetAlert error notification
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Login failed. Please check your credentials and try again.',
        });
      }
    );
  }

  signup(event: Event): void {
    event.preventDefault(); // Prevent the default form submission behavior

    const signupData = { email: this.email, password: this.password };
    this.http.post<any>('http://localhost:5000/signup/guest', signupData).subscribe(
      (response: any) => {
        console.log(response);
        this.errorMessage = '';
        // Show SweetAlert success notification
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Signup successful!',
        });
      },
      (error) => {
        console.error(error);
        this.errorMessage = error.error.error || 'An error occurred during signup.';
        // Show SweetAlert error notification
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Signup failed. Please try again later.',
        });
      }
    );
  }
}
