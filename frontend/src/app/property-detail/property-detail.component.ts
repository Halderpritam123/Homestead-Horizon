import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
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
    this.http.get<any>('http://localhost:5000/api/properties/' + propertyId)
      .subscribe(
        (response) => {
          this.property = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  editProperty(): void {
    this.router.navigate(['/property/edit', this.property.id]);
  }

  async deleteProperty(): Promise<void> {
    const result = await Swal.fire({
      icon: 'question',
      title: 'Delete',
      text: 'Are you sure you want to Delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    });
    if (result.isConfirmed) {
      this.http.delete<any>('http://localhost:5000/api/properties/' + this.property.id)
        .subscribe(
          () => {
            this.showSuccessAlert('Property deleted successfully!');
            this.router.navigate(['/property-admin']);
          },
          (error) => {
            console.error(error);
            this.showErrorAlert('Error occurred while deleting the property. Please try again.');
          }
        );
    }
  }

  goBack(): void {
    this.router.navigate(['/property-admin']);
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
