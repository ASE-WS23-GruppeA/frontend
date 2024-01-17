import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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

 

});
