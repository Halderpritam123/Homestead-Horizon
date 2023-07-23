import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css']
})
export class PropertyEditComponent implements OnInit {
  property: any = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const propertyId = params.get('id');
      if (propertyId) {
        this.fetchProperty(propertyId);
      }
    });
  }

  fetchProperty(propertyId: string): void {
    this.http.get<any>('https://horizon-2pqa.onrender.com/api/properties/' + propertyId)
      .subscribe(
        (response) => {
          this.property = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  updateProperty(): void {
    console.log(this.property);
    this.http.put<any>('https://horizon-2pqa.onrender.com/api/properties/' + this.property.id, this.property)
      .subscribe(
        () => {
          this.showSuccessAlert('Property updated successfully!');
          this.router.navigate(['/property', this.property.id]);
        },
        (error) => {
          console.error(error);
          this.showErrorAlert('Error occurred while updating the property. Please try again.');
        }
      );
  }

  goBack(): void {
    this.router.navigate(['/property', this.property.id]);
  }

  // Function to show SweetAlert success notification
  showSuccessAlert(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }

  // Function to show SweetAlert error notification
  showErrorAlert(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }
}
