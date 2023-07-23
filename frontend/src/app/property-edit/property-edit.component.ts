import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css']
})
export class PropertyEditComponent implements OnInit {
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

  updateProperty(): void {
    console.log(this.property)
    this.http.put<any>('http://localhost:5000/api/properties/' + this.property.id, this.property)
      .subscribe(
        () => {
          this.router.navigate(['/property', this.property.id]);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  goBack(): void {
    this.router.navigate(['/property', this.property.id]);
  }
}
