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

describe('FrontendTest Log-in Tests', () => {
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