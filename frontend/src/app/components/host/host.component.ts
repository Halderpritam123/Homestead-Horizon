// host.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  login(): void {
    const loginData = { email: this.email, password: this.password };
    this.http.post<any>('http://localhost:5000/login/host', loginData).subscribe(
      (response: any) => {
        console.log(response); // Handle successful login here, e.g., navigate to a different page
        this.errorMessage = '';
      },
      (error) => {
        console.error(error);
        this.errorMessage = error.error.error || 'An error occurred during login.';
      }
    );
  }

  signup(): void {
    const signupData = { email: this.email, password: this.password };
    this.http.post<any>('http://localhost:5000/signup/host', signupData).subscribe(
      (response: any) => {
        console.log(response); // Handle successful signup here, e.g., show a success message
        this.errorMessage = '';
      },
      (error) => {
        console.error(error);
        this.errorMessage = error.error.error || 'An error occurred during signup.';
      }
    );
  }
}
