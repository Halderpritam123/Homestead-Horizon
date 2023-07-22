import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  deleteProperty(): void {
    // console.log(this.property.id)
    if (confirm('Are you sure you want to delete this property?')) {
      this.http.delete<any>('http://localhost:5000/api/properties/' + this.property.id)
        .subscribe(
          () => {
            this.router.navigate(['/property-admin']);
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  goBack(): void {
    this.router.navigate(['/property-admin']);
  }
}
