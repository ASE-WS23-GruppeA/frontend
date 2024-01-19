import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { MessageService } from 'src/app/_services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  isLoading = false;
  message: string = '';
  private authStatusSub!: Subscription;  // Note the '!' postfix
  isSignUpSuccessful = false;

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    // You need to implement 'getAuthStatusListener' in your AuthService
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      (authStatus: any) => {  // Replace 'any' with the actual type you expect
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onSubmitSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.username, form.value.email, form.value.password)
      .then(() => {
        this.isLoading = false;
        this.isSignUpSuccessful = true; // Set the flag to true on successful registration
      })
    .catch(error => {
      this.isLoading = false;
        // Other errors
        this.message = error.message;
    }
    )
  }
}

