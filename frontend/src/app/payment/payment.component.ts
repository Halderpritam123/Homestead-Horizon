// payment.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  propertyData: any = {};
  cardNumber: string = '';
  cardName: string = '';
  expiryDate: string = '';
  cvv: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.propertyData = params;
    });
  }

  makePayment(): void {
    // Perform the payment logic here (not implemented in this example)

    // After successful payment, make the POST request to book the property
    this.http.post<any>('http://localhost:5000/api/properties/book', this.propertyData)
      .subscribe(
        (response) => {
          // Handle the response after successful booking
          console.log(response);
          // You can perform any other actions here, e.g., show a success message, navigate to a new page, etc.
        },
        (error) => {
          // Handle errors if any
          console.error(error);
          // You can show an error message to the user or handle the error as per your requirement
        }
      );
  }
}
