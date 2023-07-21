import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from './models/property.model'; // Replace '../models/property' with the actual path to the property model

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private baseUrl = 'http://localhost:5000/api/properties';

  constructor(private http: HttpClient) { }

  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.baseUrl);
  }

  getPropertyById(propertyId: string): Observable<Property> {
    return this.http.get<Property>(`${this.baseUrl}/${propertyId}`);
  }

  createProperty(property: Property): Observable<any> {
    return this.http.post(this.baseUrl, property);
  }

  updateProperty(propertyId: string, property: Property): Observable<any> {
    return this.http.put(`${this.baseUrl}/${propertyId}`, property);
  }

  deleteProperty(propertyId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${propertyId}`);
  }
}
