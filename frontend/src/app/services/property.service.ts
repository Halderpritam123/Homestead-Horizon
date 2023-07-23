import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private baseUrl = 'https://horizon-2pqa.onrender.com/api/properties'; // Update this URL if your backend URL is different
  sortBy: string = 'price_per_night'; // Default sort field
  sortOrder: number = 1; // 1 for ascending, -1 for descending

  constructor(private http: HttpClient) { }

  getAllProperties(
    page: number,
    perPage: number,
    titleFilter: string,
    propertyTypeFilter: string,
    locationFilter: string,
    sortBy?: string,
    sortOrder?: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString())
      .set('sort_by', sortBy || this.sortBy) // Use the provided sortBy or the default one
      .set('sort_order', sortOrder?.toString() || this.sortOrder.toString()); // Use the provided sortOrder or the default one

    if (titleFilter) {
      params = params.set('title', titleFilter);
    }

    if (propertyTypeFilter) {
      params = params.set('property_type', propertyTypeFilter);
    }

    if (locationFilter) {
      params = params.set('location', locationFilter);
    }

    return this.http.get<any>(this.baseUrl, { params });
  }
}
