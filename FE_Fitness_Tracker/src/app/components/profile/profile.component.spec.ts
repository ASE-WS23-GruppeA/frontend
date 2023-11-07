import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent]
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button', () => {
    fixture.detectChanges(); 
    const button = fixture.nativeElement.querySelector('button.btn.btnPrimary');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Save Changes');
  });

  it('should have the title My Profile', () => {
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toContain('My Profile');
  });

  it('should have label for email', () => {
    fixture.detectChanges();
    const label_email = fixture.nativeElement.querySelector('div.column label');
    expect(label_email.textContent).toContain('Email:');
  });

  it('should have an input for weight', () => {
    fixture.detectChanges();
    const input_weight = fixture.nativeElement.querySelector('div.formGroup .column input[type="number"]');
    expect(input_weight).toBeTruthy();
  });

  it('should have a selector for the gender', () => {
    fixture.detectChanges();
    const genderSelect = fixture.nativeElement.querySelector('div.formGroup .column select');
    expect(genderSelect).toBeTruthy();
  });

  it('should have an input for height', () => {
    fixture.detectChanges();
    const input_height = fixture.nativeElement.querySelector('div.formGroup .column input[type="number"][value="175"]');
    expect(input_height).toBeTruthy();
  });

  it('should have a select field for male gender', () => {
    fixture.detectChanges();
    const male = fixture.nativeElement.querySelector('div.formGroup .column select option[value="male"]');
    expect(male).toBeTruthy();
    expect(male.textContent).toContain('Male');
  });

  it('should have a select field for female gender', () => {
    fixture.detectChanges();
    const female = fixture.nativeElement.querySelector('div.formGroup .column select option[value="female"]');
    expect(female).toBeTruthy();
    expect(female.textContent).toContain('Female');
  });

  it('should have two options in the select menu', () => {
    fixture.detectChanges();
    const options = fixture.nativeElement.querySelectorAll('div.formGroup .column select option');
    expect(options.length).toBe(2); 
  });
  
  it('should have authBlock as container', () => {
    fixture.detectChanges();
    const authBlock = fixture.nativeElement.querySelector('div.authBlock');
    expect(authBlock).toBeTruthy();
  });

});
