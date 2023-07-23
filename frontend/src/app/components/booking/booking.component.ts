import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  bookedProperties: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService // Import BookingService
  ) { }

  ngOnInit(): void {
    // Fetch the booked properties from the backend
    this.bookingService.getBookedProperties().subscribe(
      (response: any) => {
        console.log('Booked properties:', response[0].property_img.slice(2,-2));
        this.bookedProperties = response;
      },
      (error: any) => {
        console.error('Error fetching booked properties:', error);
      }
    );
    this.bookedProperties = this.bookedProperties.map(property => {
      property.property_img = property.property_img[0].replace(/[\[\]']+/g, '');
      return property;
    });
  }

  deleteProperty(bookingId: string): void {
    // Send a request to the backend to delete the booking with the given bookingId
    this.bookingService.deleteBooking(bookingId).subscribe(
      () => {
        // On successful deletion, remove the booking from the bookedProperties array
        this.bookedProperties = this.bookedProperties.filter((property) => property.booking_id !== bookingId);
      },
      (error: any) => {
        console.error('Error deleting booking:', error);
      }
    );
  }
  
}

