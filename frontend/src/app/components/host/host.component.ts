import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    const loginData = { email: this.email, password: this.password };
    this.http.post<any>('http://localhost:5000/login/host', loginData).subscribe(
      (response: any) => {
        console.log(response);
        localStorage.setItem('userRole', 'host'); // Set userRole to 'host'
        localStorage.setItem('host_id', response.host_id);
        this.errorMessage = '';
        // Show SweetAlert success notification
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login successful!',
        });
        this.router.navigate(['/property-admin']); // Redirect to the property admin page
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

  signup(): void {
    const signupData = { email: this.email, password: this.password };
    this.http.post<any>('http://localhost:5000/signup/host', signupData).subscribe(
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
