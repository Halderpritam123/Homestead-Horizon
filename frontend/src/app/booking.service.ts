import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from './models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:5000/api/bookings';

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl);
  }

  getBookingById(bookingId: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${bookingId}`);
  }

  createBooking(booking: Booking): Observable<any> {
    return this.http.post(this.baseUrl, booking);
  }

  updateBooking(bookingId: string, booking: Booking): Observable<any> {
    return this.http.put(`${this.baseUrl}/${bookingId}`, booking);
  }

  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${bookingId}`);
  }
}
