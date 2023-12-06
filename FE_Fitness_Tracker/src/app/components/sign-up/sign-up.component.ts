import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  onSubmitSignUp(form: NgForm): void {
    if (form.valid) {
      // Your sign-up logic goes here
      console.log('Form submitted successfully!');
      // You can access form.value to get the form data
      // For example: const email = form.value.userEmail;
      //              const username = form.value.username;
      //              const password = form.value.password;
    } else {
      // Handle validation errors
      console.log('Form has validation errors!');
    }
  }
}