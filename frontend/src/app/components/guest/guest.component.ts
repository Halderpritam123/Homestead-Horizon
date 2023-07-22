import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
        console.log(response); // Handle successful login here, e.g., navigate to the property page
        this.errorMessage = '';
        alert('Login successful!');
        this.router.navigate(['/property']); // Navigate to the property page
      },
      (error) => {
        console.error(error);
        this.errorMessage = error.error.error || 'An error occurred during login.';
      }
    );
  }

  signup(): void {
    const signupData = { email: this.email, password: this.password };
    this.http.post<any>('http://localhost:5000/signup/guest', signupData).subscribe(
      (response: any) => {
        console.log(response); // Handle successful signup here, e.g., show a success message
        this.errorMessage = '';
        alert('Signup successful!');
      },
      (error) => {
        console.error(error);
        this.errorMessage = error.error.error || 'An error occurred during signup.';
      }
    );
  }
}
