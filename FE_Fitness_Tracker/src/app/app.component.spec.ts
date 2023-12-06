import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FE_Fitness_Tracker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('FE_Fitness_Tracker');
  });

  it('should have a logo in the title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement as HTMLElement;
    const logo = app.querySelector('.logo') as HTMLImageElement;
    expect(logo).toBeTruthy();
    expect(logo.src).toContain('/assets/FITJourney_logo.png');
  });
  
  it('should have links for dashboard page', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement as HTMLElement;
    const dashboard = app.querySelector('[routerLink="/dashboard"]');
    expect(dashboard).toBeTruthy();
  });

  
  it('should have a link for about page', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement as HTMLElement;
    const about = app.querySelector('[routerLink="/about"]');
    expect(about).toBeTruthy();
  });

  it('should have a header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement as HTMLElement;
    const header = app.querySelector('.header');
    expect(header).toBeTruthy();
  });

  it('should have a footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement as HTMLElement;
    const footer = app.querySelector('.footer');
    expect(footer).toBeTruthy();
  });

  it('should have link to the profile', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const app = fixture.nativeElement as HTMLElement;
    const dropdown = app.querySelector('.fa-user') as HTMLElement;
    dropdown.click();
    fixture.detectChanges();
    const myProfileLink = app.querySelector('[routerLink="/profile"]');
    expect(myProfileLink).toBeTruthy();
  });

  it('should have link to logout', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const app = fixture.nativeElement as HTMLElement;
    const dropdown = app.querySelector('.fa-user') as HTMLElement;
    dropdown.click();
    fixture.detectChanges();
    const logOutLink = app.querySelector('[routerLink="/log-in"]');
    expect(logOutLink).toBeTruthy();
  });

  it('should have a dropdown', () => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();
    const app = fixture.nativeElement as HTMLElement;
    const dropdown = app.querySelector('.dropdown');
    expect(dropdown).toBeTruthy();
  });


  it('should open when dropdown is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();
    const app = fixture.nativeElement as HTMLElement;
    const dropdown = app.querySelector('.fa-user') as HTMLElement;
    
    dropdown.click();
    fixture.detectChanges();
    const content = app.querySelector('.dropdown-content');
    expect(content).toBeTruthy();
  });
  
});
