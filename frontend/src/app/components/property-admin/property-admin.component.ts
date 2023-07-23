import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-property-admin',
  templateUrl: './property-admin.component.html',
  styleUrls: ['./property-admin.component.css'],
})
export class PropertyAdminComponent implements OnInit {
  properties: any[] = [];
  propertyData: any = {};
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10;
  titleFilter: string = '';
  propertyTypeFilter: string = '';
  locationFilter: string = '';
  sortField: string = 'price_per_night'; // Default sort field
  sortOrder: number = 1; // Default sort order (ascending)

  constructor(
    private propertyService: PropertyService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.propertyData.host_id = localStorage.getItem('host_id') || '';
    this.getProperties();
  }

  getProperties(): void {
    this.propertyService
      .getAllProperties(
        this.currentPage,
        this.perPage,
        this.titleFilter,
        this.propertyTypeFilter,
        this.locationFilter,
        this.sortField,
        this.sortOrder // Pass sorting parameters separately
      )
      .subscribe(
        (response: any) => {
          this.properties = response;
          this.totalPages = response.totalPages;
        },
        (error: any) => {
          console.error('Error fetching properties:', error);
        }
      );
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.getProperties();
  }

  nextPage(): void {
    this.currentPage++;
    this.getProperties();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProperties();
    }
  }

  toggleSortDirection(): void {
    this.getProperties(); // Fetch properties again with the updated sorting parameters
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

  viewProperty(propertyId: string): void {
    this.router.navigate(['/property', propertyId]);
  }

  postProperty(): void {
    console.log(this.propertyData);
    this.http
      .post<any>('https://horizon-2pqa.onrender.com/api/properties', this.propertyData)
      .subscribe(
        (response) => {
          console.log(response); // You can handle the success response here
          this.showSuccessAlert('Property posted successfully!');
          this.propertyData = {}; // Clear the form fields after successful posting
          this.getProperties(); // Fetch the updated properties list after posting
        },
        (error) => {
          console.error(error); // You can handle the error response here
          this.showErrorAlert('Error occurred while posting the property. Please try again.');
        }
      );
  }
}
