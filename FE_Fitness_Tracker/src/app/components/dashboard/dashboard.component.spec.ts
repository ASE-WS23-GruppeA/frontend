import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
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
  
 
  });

