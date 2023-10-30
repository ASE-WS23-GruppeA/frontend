import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent]
    });
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should show the title', () => {
    const headingElement = fixture.nativeElement.querySelector('h2.about-link');
    expect(headingElement).toBeTruthy();
    expect(headingElement.textContent).toContain('About Us');
  });

  it('should show four card', () => {
    const cardElements = fixture.nativeElement.querySelectorAll('.container-card');
    expect(cardElements.length).toBe(4);
  });

  it('should show the logo', () => {
    const imgElement = fixture.nativeElement.querySelector('img');
    expect(imgElement).toBeTruthy();
    expect(imgElement.getAttribute('src')).toEqual('./assets/FITJourney_logo2.png');
  });

  it('should show card Title User Profile Management', () => {
    const cardTitle = fixture.nativeElement.querySelector('.card-title');
    expect(cardTitle.textContent).toContain('User Profile Management');
  });

  it('should show card Title Workout and Exercise Tracking', () => {
    const cardTitle = fixture.nativeElement.querySelectorAll('.card-title')[1];
    expect(cardTitle.textContent).toContain('Workout and Exercise Tracking');
  });

  it('should show card Title Analytics and Progress Reports', () => {
    const cardTitle = fixture.nativeElement.querySelectorAll('.card-title')[2];
    expect(cardTitle.textContent).toContain('Analytics and Progress Reports');
  });

  it('should show Title Notifications and Alerts', () => {
    const cardTitle = fixture.nativeElement.querySelectorAll('.card-title')[3];
    expect(cardTitle.textContent).toContain('Notifications and Alerts');
  });

  it('should show paragraph for card1', () => {
    const cardParagraph = fixture.nativeElement.querySelector('.card-text');
    expect(cardParagraph.textContent).toContain('Manage your fitness profile, set goals, and track your progress.');
  });

  it('should show paragraph for card2', () => {
    const cardParagraph = fixture.nativeElement.querySelectorAll('.card-text')[1];
    expect(cardParagraph.textContent).toContain('Track your workouts, exercises, sets, and repetitions effortlessly.');
  });

  it('should show paragraph for card3', () => {
    const cardParagraph = fixture.nativeElement.querySelectorAll('.card-text')[2];
    expect(cardParagraph.textContent).toContain('Analyze your fitness progress and access detailed reports.');
  });

  it('should show paragraph for card4', () => {
    const cardParagraph = fixture.nativeElement.querySelectorAll('.card-text')[3];
    expect(cardParagraph.textContent).toContain('Stay on track with workout reminders and progress alerts.');
  });

});
