import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
  property: any = {};
  bookDate: string = ''; // Variable to store the selected book date
  endDate: string = ''; // Variable to store the selected end date
  totalDays: number = 0; // Variable to store the calculated total days
  totalRent: number = 0; // Variable to store the calculated total rent
  bookingError: string = ''; // Variable to store any booking errors

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

  goBack(): void {
    this.router.navigate(['/property']);
  }

  calculateTotalRent(): void {
    const startDate = new Date(this.bookDate);
    const endDate = new Date(this.endDate);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    this.totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    this.totalRent = this.totalDays * this.property.price_per_night;
  }

  bookProperty(): void {
    if (this.property.status === false) {
      this.bookingError = 'Property not available for booking.';
      return;
    }
console.log(this.property.img)
    // Prepare the data for the POST request
    const bookingData = {
      property_id: this.property.id,
      property_title: this.property.title,
      price_per_night: this.property.price_per_night,
      property_location: this.property.location,
      property_img:this.property.img,
      book_date: this.bookDate,
      end_date: this.endDate
    };

    // Make the POST request to book the property
    this.http.post<any>('http://localhost:5000/api/properties/book', bookingData)
      .subscribe(
        (response) => {
          // Handle the response after successful booking
          console.log(response);
          // You can perform any other actions here, e.g., show a success message, navigate to a new page, etc.
        },
        (error) => {
          // Handle errors if any
          console.error(error);
          this.bookingError = 'Error occurred during booking. Please try again.';
          // You can show an error message to the user or handle the error as per your requirement
        }
      );
  }
}
