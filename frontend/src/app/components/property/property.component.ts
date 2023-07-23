import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  properties: any[] = [];
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
    console.log("Ok")
    // if (this.currentPage < this.totalPages) {
      this.currentPage++;
      console.log(this.currentPage)
      this.getProperties();
    // }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      console.log(this.currentPage)
      this.getProperties();
    }
  }

  viewPreview(propertyId: string): void {
    this.router.navigate(['/preview', propertyId]);
  }

  toggleSortDirection(): void {
    this.getProperties(); // Fetch properties again with the updated sorting parameters
  }
}
