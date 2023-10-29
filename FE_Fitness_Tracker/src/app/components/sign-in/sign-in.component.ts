import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})

export class SignInComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() :void {
    // This is the ngOnInit method
    // You can put your initialization code here
  }
  
  signIn() {
    //Put your signin logic here 
    
    this.router.navigate(['/dashboard']);
  }
}