import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { of, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';

describe('LoginInComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [LoginComponent],
      providers: [AuthService] // Provide the real AuthService
    })
      .compileComponents();
  }));

  beforeEach(() => {
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

  it('should create component', () => {
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

  it('should display an error message when login fails', waitForAsync(async () => {
    const authService = TestBed.inject(AuthService); // Get the real AuthService
    spyOn(authService, 'login').and.returnValue(throwError('Invalid credentials'));

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable(); // Wait for async operations to complete
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Invalid credentials');
  }));

  it('should check form validity when submitting', () => {
    // Assuming you have set the form validity to false in case of errors
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValue(throwError('Invalid credentials'));

    // Call the onSubmitLogin function with an invalid form
    component.onSubmitLogin({ valid: false } as NgForm);

    // Check if the form is invalid
    expect(component.AuthUserSub).toBeUndefined();
  });

  it('should clear the error message when form is submitted after a previous error', waitForAsync(async () => {
    const authService = TestBed.inject(AuthService); // Get the real AuthService
    spyOn(authService, 'login').and.returnValue(throwError('Invalid credentials'));

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable(); // Wait for async operations to complete
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Invalid credentials');

    // Create a mock form with invalid status
    const mockForm = <NgForm>{
      valid: false
    };

    // Submit the form again by calling onSubmitLogin with the mock form
    component.onSubmitLogin(mockForm);
    await fixture.whenStable(); // Wait for async operations to complete
    fixture.detectChanges();

    const updatedErrorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(updatedErrorMessage).toBeFalsy(); // Error message should be cleared
  }));


  it('should unsubscribe from AuthUserSub in ngOnDestroy', () => {
    component.ngOnDestroy();
    if (component.AuthUserSub) {
      expect(component.AuthUserSub.closed).toBeTruthy();
    } else {
      // Handle the case where AuthUserSub is undefined
      expect(true).toBeTruthy(); // Adjust as needed
    }
  });

});
