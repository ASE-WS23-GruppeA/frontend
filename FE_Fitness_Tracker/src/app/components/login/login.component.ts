import {Router} from "@angular/router";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from 'src/app/_services/auth.service';
import {MessageService} from '../../_services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  message: string = '';
  errorMessage!: string;
  AuthUserSub?: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.currentMessage.subscribe(msg => this.message = msg);

    this.authService.autoLogin();
  }

  onSubmitLogin(formLogin: NgForm) {
    this.messageService.clearMessage();

    if (!formLogin.valid) {
      return;
    }

    const username = formLogin.value.username;
    const password = formLogin.value.password;

    this.AuthUserSub = this.authService.login(username, password).subscribe({
      next: userData => {
        this.router.navigate(['dashboard']);
        this.messageService.clearMessage();
      },
      error: err => {
        this.errorMessage = err;
        console.log(err);
      }
    });
  }

  ngOnDestroy() {
    if (this.AuthUserSub) {
      this.AuthUserSub.unsubscribe();
    }
  }

  protected readonly console = console;

  clearMessage() {
    this.messageService.clearMessage();
  }

}
