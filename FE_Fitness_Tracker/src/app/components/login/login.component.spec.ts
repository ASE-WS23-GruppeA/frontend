import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { throwError } from 'rxjs';
import { NgForm } from '@angular/forms';

describe('LoginInComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule], 
      declarations: [LoginComponent]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Create a mock form with the same structure as the actual form
  const mockForm = <NgForm>{
    value: {
      username: 'testUser',
      password: 'testPassword'
    },
    valid: true // You can toggle this based on the test case needs
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('should call onSubmitLogin function when the form is submitted', () => {

    spyOn(component, 'onSubmitLogin');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.onSubmitLogin).toHaveBeenCalled();
  });


  it('should have a username input field', () => {
    const usernameInput = fixture.nativeElement.querySelector('input#username');
    expect(usernameInput).toBeTruthy();
    expect(usernameInput.type).toBe('text');
    expect(usernameInput.placeholder).toBe('Username');
  });

  it('should have a password input field', () => {
    const passwordInput = fixture.nativeElement.querySelector('input#password');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.type).toBe('password');
    expect(passwordInput.placeholder).toBe('Password');
  });


  it('should have a submit button', () => {
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
    expect(submitButton.textContent).toContain('Login');
  });

  it('should call AuthService.login on form submit', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login');

    // Assuming you have a method in your component that gets called on form submit
    component.onSubmitLogin(mockForm);

    expect(authService.login).toHaveBeenCalled();
  });

  it('should handle invalid credentials error', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValue(throwError({ status: 401 }));

    component.onSubmitLogin(mockForm);

    expect(component.errorMessage).toBe('Invalid credentials');
  });

  it('should handle server error', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValue(throwError({ status: 500 }));

    component.onSubmitLogin(mockForm);

    // Assuming your component sets a generic error message for server errors
    expect(component.errorMessage).toBe('Server error, please try again later');
  });



 

});
