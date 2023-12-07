import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  errorMessage!: string;
  AuthUserSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.autoLogin();
  }

  onSubmitLogin(formLogin: NgForm) {
    if (!formLogin.valid) {
      return;
    }
    const username = formLogin.value.username;
    const password = formLogin.value.password;

    this.authService.login(username, password).subscribe({
      next: userData => {
        this.router.navigate(['dashboard']);
      },
      error: err => {
        this.errorMessage = err;
        console.log(err);
      }
    });
  }

  ngOnDestroy() {
    this.AuthUserSub.unsubscribe();
  }

  protected readonly console = console;
}
