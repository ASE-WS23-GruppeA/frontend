import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have a header with your dashboard', () => {
    const cardHeader = fixture.nativeElement.querySelector('.card-header');
    expect(cardHeader.textContent).toContain('Your Dashboard');
  });
  
  it('should have a card for the statistics', () => {
    const statisticsCard = fixture.nativeElement.querySelectorAll('.card')[1];
    expect(statisticsCard).toBeTruthy();
  });
  
  it('should have a card header with the statistics', () => {
    const cardHeader = fixture.nativeElement.querySelectorAll('.card-header')[1];
    expect(cardHeader.textContent).toContain('Your Statistics');
  });
  
  it('should have a button to add a workout', () => {
    const addWorkoutButton = fixture.nativeElement.querySelector('a.btn.btnPrimary.btn-lg');
    expect(addWorkoutButton.textContent).toContain('Add Workout');
  });
  });

