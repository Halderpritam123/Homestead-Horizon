import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import Swal from 'sweetalert2'; // Import SweetAlert

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
        // Show SweetAlert error notification
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error fetching booked properties. Please try again later!',
        });
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
        // Show SweetAlert success notification
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Booking deleted successfully!',
        });
      },
      (error: any) => {
        console.error('Error deleting booking:', error);
        // Show SweetAlert error notification
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error deleting booking. Please try again later!',
        });
      }
    );
  }
}
