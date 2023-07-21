import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guest } from './models/guest.model'; // Replace '../models/guest' with the actual path to the guest model

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private baseUrl = 'http://localhost:5000/api/guests';

  constructor(private http: HttpClient) { }

  getAllGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.baseUrl);
  }

  getGuestById(guestId: string): Observable<Guest> {
    return this.http.get<Guest>(`${this.baseUrl}/${guestId}`);
  }

  createGuest(guest: Guest): Observable<any> {
    return this.http.post(this.baseUrl, guest);
  }

  updateGuest(guestId: string, guest: Guest): Observable<any> {
    return this.http.put(`${this.baseUrl}/${guestId}`, guest);
  }

  deleteGuest(guestId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${guestId}`);
  }
}
