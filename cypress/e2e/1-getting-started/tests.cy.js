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
    
    cy.get('.exercise-list-container ul').find('li').should('have.length', 2);
  });

  it('should display chest exercises when muscle group is clicked', () => {
    cy.visit('http://localhost:4200/new-workout');

    cy.contains('Chest').click();

    cy.contains('Chest Exercises').should('be.visible');
    cy.contains('Push-ups').should('be.visible');
    cy.contains('Bench press').should('be.visible');
    
    cy.get('.exercise-list-container ul').find('li').should('have.length', 2);
  });

  it('should display back exercises when muscle group is clicked', () => {
    cy.visit('http://localhost:4200/new-workout');

    cy.contains('Back').click();

    cy.contains('Back Exercises').should('be.visible');
    cy.contains('Pull-ups').should('be.visible');
    cy.contains('Barbell rows').should('be.visible');
    
    cy.get('.exercise-list-container ul').find('li').should('have.length', 2);
  });

  it('should display core exercises when muscle group is clicked', () => {
    cy.visit('http://localhost:4200/new-workout');

    cy.contains('Core').click();

    cy.contains('Core Exercises').should('be.visible');
    cy.contains('Sit-ups').should('be.visible');
    cy.contains('Plank').should('be.visible');
    
    cy.get('.exercise-list-container ul').find('li').should('have.length', 2);
  });

  it('should display triceps exercises when muscle group is clicked', () => {
    cy.visit('http://localhost:4200/new-workout');

    cy.contains('Triceps').click();

    cy.contains('Triceps Exercises').should('be.visible');
    cy.contains('Tricep extension').should('be.visible');
    cy.contains('Skull crushers').should('be.visible');
    
    cy.get('.exercise-list-container ul').find('li').should('have.length', 2);
  });

  it('should display calves exercises when muscle group is clicked', () => {
    cy.visit('http://localhost:4200/new-workout');

    cy.contains('Calves').click();

    cy.contains('Calves Exercises').should('be.visible');
    cy.contains('Calf raises').should('be.visible');
    cy.contains('Calf stretches').should('be.visible');
    
    cy.get('.exercise-list-container ul').find('li').should('have.length', 2);
  });

  it('should display shoulders exercises when muscle group is clicked', () => {
    cy.visit('http://localhost:4200/new-workout');

    cy.contains('Shoulders').click();

    cy.contains('Shoulders Exercises').should('be.visible');
    cy.contains('Lateral raises').should('be.visible');
    cy.contains('Front raises').should('be.visible');
    
    cy.get('.exercise-list-container ul').find('li').should('have.length', 2);
  });


it('should display biceps exercises when muscle group is clicked', () => {
  cy.visit('http://localhost:4200/new-workout');

  cy.contains('Biceps').click();

  cy.contains('Biceps Exercises').should('be.visible');
  cy.contains('Cable curls').should('be.visible');
  cy.contains('Hammer curls').should('be.visible');
  
  cy.get('.exercise-list-container ul').find('li').should('have.length', 2);
});

it('should display glutes exercises when muscle group is clicked', () => {
  cy.visit('http://localhost:4200/new-workout');

  cy.contains('Glutes').click();

  cy.contains('Glutes Exercises').should('be.visible');
  cy.contains('Hip thrusts').should('be.visible');
  cy.contains('Cable pull-throughs').should('be.visible');
  
  cy.get('.exercise-list-container ul').find('li').should('have.length', 2);
});

it('should display glutes exercises when muscle group is clicked', () => {
  cy.visit('http://localhost:4200/new-workout');

  cy.contains('Obliques').click();

  cy.contains('Obliques Exercises').should('be.visible');
  cy.contains('Woodchoppers').should('be.visible');
  cy.contains('Russian twist').should('be.visible');
  
  cy.get('.exercise-list-container ul').find('li').should('have.length', 2);
});
});



  
  

