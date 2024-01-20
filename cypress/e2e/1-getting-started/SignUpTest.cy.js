/// <reference types="cypress" />

describe('FrontendTest Sign-Up Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  //Sign-Up
  describe('Navigation Test Sign-Up', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200/sign-up');
    });
    
    // navigates to about page
    it('navigates to the About page when About link is clicked', () => {
      cy.get('.footer a').contains('About').click();
      cy.url().should('include', '/about');
    });
    
    // renders the sign-up form
    it('renders the sign-up form with all fields', () => {
      cy.get('form').should('exist');
      cy.get('#email').should('be.visible');
      cy.get('#username').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Sign Up');
    });
    
    // not submit with empty fields
    it('does not submit the form with empty fields and shows validation messages', () => {
      cy.get('button[type="submit"]').click();
      cy.get('.text-danger').should('contain', 'Email is required');
      cy.get('.text-danger').should('contain', 'Username is required');
      cy.get('.text-danger').should('contain', 'Password is required');
    });
    
    // inputs
    it('accepts input for email, username, and password', () => {
      cy.get('#email').type('test@example.com');
      cy.get('#username').type('testuser');
      cy.get('#password').type('password123');
      // Add assertion to check if inputs are correctly filled if needed
    });
    
    // Placeholder test for successful sign-up
    it('successfully signs up a new user', () => {
      // This test would mock a successful sign-up response and check the success message
      // To be implemented once the backend is available
    });
    
    it('navigates to the login page when the link is clicked', () => {
      cy.get('.redirectToLogin .redirect').click();
      cy.url().should('include', '/log-in');
    });
    
  })
})