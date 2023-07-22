import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-admin',
  templateUrl: './property-admin.component.html',
  styleUrls: ['./property-admin.component.css'],
})
export class PropertyAdminComponent implements OnInit {
  properties: any[] = [];
  propertyData: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.propertyData.host_id = localStorage.getItem('host_id') || '';
    this.fetchProperties();
  }

  fetchProperties(): void {
    this.http
      .get<any[]>('http://localhost:5000/api/properties')
      .subscribe(
        (response) => {
          this.properties = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  viewProperty(propertyId: string): void {
    this.router.navigate(['/property', propertyId]);
  }

  postProperty(): void {
    console.log(this.propertyData)
    this.http
      .post<any>('http://localhost:5000/api/properties', this.propertyData)
      .subscribe(
        (response) => {
          console.log(response); // You can handle the success response here
          this.propertyData = {}; // Clear the form fields after successful posting
          this.fetchProperties(); // Fetch the updated properties list after posting
        },
        (error) => {
          console.error(error); // You can handle the error response here
        }
      );
  }
}
