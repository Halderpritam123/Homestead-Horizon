import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;
  propertyData: any = {};
  currentStep: number = 1;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.route.queryParams.subscribe(params => {
      this.propertyData = params;
    });
  }

  initForms(): void {
    this.step1Form = this.fb.group({
      fullName: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      gender: ['', Validators.required],
      mobileNo: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]]
    });

    this.step2Form = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      confirmCardNumber: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/\\d{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]]
    });
  }

  goToStep(step: number): void {
    if (this.currentStep === 1 && this.step1Form.invalid) {
      // If Step 1 form is invalid, prevent proceeding to Step 2
      this.showErrorAlert('Please fill all required fields in Step 1.');
      return;
    }
    if (this.currentStep === 2 && this.step2Form.invalid) {
      // If Step 2 form is invalid, prevent proceeding to Step 3
      this.showErrorAlert('Please fill all required fields in Step 2.');
      return;
    }
    this.currentStep = step;
  }

  // Function to show SweetAlert success notification
  showSuccessAlert(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }

  // Function to show SweetAlert error notification
  showErrorAlert(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  makePayment(): void {
    // Access form values for Step 3 (Card Information)
    const cardNumber = this.step2Form.get('cardNumber')?.value;
    const cardName = this.step2Form.get('cardName')?.value;
    const expiryDate = this.step2Form.get('expiryDate')?.value;
    const cvv = this.step2Form.get('cvv')?.value;

    // Prepare payment data (simulated)
    const paymentData = {
      cardNumber,
      cardName,
      expiryDate,
      cvv,
      totalAmount: this.propertyData.total_price // Replace with the actual total amount from your calculation
    };

    // Simulate payment request
    console.log('Payment Data:', paymentData);

    // Prepare the data for the POST request
    // const bookingData = {
    //   property_id: 123, // Replace with the actual property ID
    //   property_title: 'Sample Property', // Replace with the actual property title
    //   price_per_night: 100, // Replace with the actual price per night
    //   property_location: 'Sample Location', // Replace with the actual property location
    //   property_img: 'sample-image-url.jpg', // Replace with the actual image URL
    //   book_date: '2023-07-23', // Replace with the actual booking date
    //   end_date: '2023-07-24' // Replace with the actual end date
    // };

    // Make the POST request to book the property
    this.http.post<any>('http://localhost:5000/api/properties/book', this.propertyData).subscribe(
      (response) => {
        // Handle the response after successful booking
        console.log(response);
        this.showSuccessAlert('Property booked successfully!');
        this.router.navigate(['/home']); // You can perform any other actions here, e.g., show a success message, navigate to a new page, etc.
      },
      (error) => {
        // Handle errors if any
        console.error(error);
        this.showErrorAlert('Error occurred during booking. Please try again.'); // You can show an error message to the user or handle the error as per your requirement
      }
    );
  }
}
