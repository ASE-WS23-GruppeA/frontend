import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { FormsModule } from '@angular/forms';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SignUpComponent]
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a username input field', () => {
    const usernameInput = fixture.nativeElement.querySelector('input#username[type="text"]');
    expect(usernameInput).toBeTruthy();
    expect(usernameInput.placeholder).toBe('Username');
  });

  it('should have a password input field', () => {
    const passwordInput = fixture.nativeElement.querySelector('input#password[type="password"]');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.placeholder).toBe('Password');
  });
  
  
  it('should have a submit button', () => {
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
    expect(submitButton.textContent).toContain('Sign Up');
  });
  
  it('should call onSubmitSignUp when form is submitted', () => {
    spyOn(component, 'onSubmitSignUp');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(component.onSubmitSignUp).toHaveBeenCalled();
  });

});
