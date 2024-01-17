/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('FrontendTest', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:4200')
  })
  
  //Log-In
  describe('Navigation Test Login', () => {
    beforeEach(() => {
      // Visit login-page before each test
      cy.visit('http://localhost:4200/log-in');
    });
  
    it('navigates to the About page when About link is clicked', () => {
      cy.get('.footer a').contains('About').should('be.visible').click();
  
      cy.url().should('include', '/about');
  
    });
  });
});

    //Sign-Up
  describe('Navigation Test Sign-Up', () => {
  beforeEach(() => {
    // Visit login-page before each test
    cy.visit('http://localhost:4200/sign-up');
  });

  it('navigates to the About page when About link is clicked', () => {

    cy.get('.footer a').contains('About').click();
    cy.url().should('include', '/about');

  });
});

describe('New Workout Tests', () => {
  it('should display leg exercises when the Legs muscle group is clicked', () => {
    cy.visit('http://localhost:4200/new-workout');

    cy.contains('Legs').click();

    cy.contains('Legs Exercises').should('be.visible');
  
    cy.contains('Squats').should('be.visible');
cy.contains('Lunges').should('be.visible');
cy.contains('Deadlifts').should('be.visible');
cy.contains('Leg Press').should('be.visible');
cy.contains('Leg Curls').should('be.visible');
cy.contains('Leg Extensions').should('be.visible');
cy.contains('Romanian Deadlifts').should('be.visible');
cy.contains('Step-ups').should('be.visible');
cy.contains('Stiff-legged Deadlifts').should('be.visible');
cy.contains('Sissy Squats').should('be.visible');
cy.contains('Hack Squats').should('be.visible');
cy.contains('Hamstring Curls').should('be.visible');
cy.contains('Lunges with Dumbbells').should('be.visible');
cy.contains('Box Jumps').should('be.visible');

    
    cy.get('.exercise-list-container ul').find('li').should('have.length', 14);
  });

  it('should display chest exercises when muscle group is clicked', () => {
    cy.visit('http://localhost:4200/new-workout');

    cy.contains('Chest').click();

    cy.contains('Chest Exercises').should('be.visible');

    cy.contains('Decline Bench Press').should('be.visible');
cy.contains('Push-ups').should('be.visible');
cy.contains('Bench Press').should('be.visible');
cy.contains('Dips').should('be.visible');
cy.contains('Incline Bench Press').should('be.visible');
cy.contains('Dumbbell Bench Press').should('be.visible');
cy.contains('Dumbbell Flyes').should('be.visible');

    
    cy.get('.exercise-list-container ul').find('li').should('have.length', 7);
  });

  it('should display back exercises when muscle group is clicked', () => {
    cy.visit('http://localhost:4200/new-workout');

    cy.contains('Back').click();
    cy.contains('Back Exercises').should('be.visible');

    cy.contains('Pull-ups').should('be.visible');
    cy.contains('Dumbbell Rows').should('be.visible');
    cy.contains('Barbell Rows').should('be.visible');
    cy.contains('Deadlifts').should('be.visible');
    cy.contains('Pull-Downs').should('be.visible');
    cy.contains('Seated Rows').should('be.visible');
    cy.contains('Reverse Flyes').should('be.visible');
    cy.contains('Romanian Deadlifts').should('be.visible');
    cy.contains('Stiff-legged Deadlifts').should('be.visible');
    cy.contains('Cable Rows').should('be.visible');
    cy.contains('Lat Pulldowns').should('be.visible');
    cy.contains('Chin-ups').should('be.visible');
    cy.contains('Kettlebell Swings').should('be.visible');
    
    
    
    cy.get('.exercise-list-container ul').find('li').should('have.length', 13);
  });

  it('should display core exercises when muscle group is clicked', () => {
    cy.visit('http://localhost:4200/new-workout');

    cy.contains('Core').click();

    cy.contains('Core Exercises').should('be.visible');
    cy.contains('Sit-ups').should('be.visible');
    cy.contains('Planks').should('be.visible');
    cy.contains('Russian Twists').should('be.visible');
    cy.contains('Hanging Leg Raise').should('be.visible');
    cy.contains('Bicycle Crunches').should('be.visible');
    cy.contains('Ab Wheel Rollouts').should('be.visible');
    cy.contains('Flutter Kicks').should('be.visible');
    cy.contains('Dragon Flags').should('be.visible');
    cy.contains('Reverse Crunches').should('be.visible');
    cy.contains('Leg Raises').should('be.visible');
    
    
    cy.get('.exercise-list-container ul').find('li').should('have.length', 10);
  });

  it('should display triceps exercises when muscle group is clicked', () => {
    cy.visit('http://localhost:4200/new-workout');

    cy.contains('Triceps').click();

    cy.contains('Triceps Exercises').should('be.visible');

    cy.contains('Tricep extensions').should('be.visible');
    cy.contains('Decline Bench Press').should('be.visible');
    cy.contains('Skull Crushers').should('be.visible');
    cy.contains('Bench Press').should('be.visible');
    cy.contains('Dips').should('be.visible');
    cy.contains('Shoulder Press').should('be.visible');
    cy.contains('Incline Bench Press').should('be.visible');
    cy.contains('Tricep Extensions').should('be.visible');
    cy.contains('Close-grip Bench Press').should('be.visible');
    cy.contains('Dumbbell Bench Press').should('be.visible');
    

    
    cy.get('.exercise-list-container ul').find('li').should('have.length', 10);
  });

  it('should display calves exercises when muscle group is clicked', () => {
    cy.visit('http://localhost:4200/new-workout');

    cy.contains('Calves').click();

    cy.contains('Calves Exercises').should('be.visible');
    cy.contains('Calf Raises').should('be.visible');
    cy.contains('Calf stretches').should('be.visible');
    
    cy.get('.exercise-list-container ul').find('li').should('have.length', 2);
  });

  it('should display shoulders exercises when muscle group is clicked', () => {
    cy.visit('http://localhost:4200/new-workout');

    cy.contains('Shoulders').click();

    cy.contains('Shoulders Exercises').should('be.visible');
    cy.contains('Lateral Raises').should('be.visible');
    cy.contains('Front Raises').should('be.visible');
    cy.contains('Shoulder Press').should('be.visible');
    cy.contains('Reverse Flyes').should('be.visible');
    cy.contains('Face Pulls').should('be.visible');
    cy.contains('Dumbbell Bench Press').should('be.visible');
    
    
    cy.get('.exercise-list-container ul').find('li').should('have.length', 6);
  });


it('should display biceps exercises when muscle group is clicked', () => {
  cy.visit('http://localhost:4200/new-workout');

  cy.contains('Biceps').click();

  cy.contains('Biceps Exercises').should('be.visible');
  cy.contains('Cable Curls').should('be.visible');
  cy.contains('Hammer Curls').should('be.visible');
  cy.contains('Pull-Downs').should('be.visible');
  cy.contains('Bicep Curls').should('be.visible');
  cy.contains('Cable Rows').should('be.visible');
  cy.contains('Preacher Curls').should('be.visible');
  cy.contains('Lat Pulldowns').should('be.visible');
  cy.contains('Chin-ups').should('be.visible');
  
  
  cy.get('.exercise-list-container ul').find('li').should('have.length', 8);
});

it('should display glutes exercises when muscle group is clicked', () => {
  cy.visit('http://localhost:4200/new-workout');

  cy.contains('Glutes').click();

  cy.contains('Glutes Exercises').should('be.visible');
  cy.contains('Hip Thrusts').should('be.visible');
  cy.contains('Cable Pull-throughs').should('be.visible');
  cy.contains('Kettlebell Swings').should('be.visible');
  
  
  cy.get('.exercise-list-container ul').find('li').should('have.length', 3);
});

it('should display obliques exercises when muscle group is clicked', () => {
  cy.visit('http://localhost:4200/new-workout');

  cy.contains('Obliques').click();

  cy.contains('Obliques Exercises').should('be.visible');
  cy.contains('Woodchoppers').should('be.visible');
  cy.contains('Russian twist').should('be.visible');
  
  cy.get('.exercise-list-container ul').find('li').should('have.length', 3);
});
});



  
  

