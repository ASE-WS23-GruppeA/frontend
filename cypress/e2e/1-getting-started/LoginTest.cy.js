/// <reference types="cypress" />

describe('FrontendTest Log-in Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })
  
  //Log-In
  describe('Navigation Test Login', () => {
    beforeEach(() => {
      // Visit login-page before each test
      cy.visit('http://localhost:4200/log-in');
    });
  
    // navigates to about page
    it('navigates to the About page when About link is clicked', () => {
      cy.get('.footer a').contains('About').should('be.visible').click();
  
      cy.url().should('include', '/about');
  
    });

    // renders the login form
    it('renders the login form with all fields', () => {
      cy.get('form').should('exist');
      cy.get('#username').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Login');
    });

    // not submit with empty fields
    it('does not submit the form with empty fields', () => {
      cy.get('button[type="submit"]').click();
      cy.get('.text-danger').should('contain', 'Username is required');
      cy.get('.text-danger').should('contain', 'Password is required');
    });

    // validation messages for invalid inputs
    it('shows validation messages for invalid inputs', () => {
      cy.get('#username').type('test');
      cy.get('#password').type('123');
      cy.get('button[type="submit"]').click();
      cy.get('.text-danger').should('contain', 'Password must be at least 6 characters');
    });

    // navigates to sign up when link is clicked
    it('navigates to sign up page when the link is clicked', () => {
      cy.get('.redirectToLogin .redirect').click();
      cy.url().should('include', '/sign-up');
    });

    // We'll need to mock backend responses for the next tests
    // For now, they are placeholders for future implementation.

    it('submits the form with correct input and navigates to dashboard on successful login', () => {
      // Mock the backend response for successful login
      // This will be implemented once the backend is available
    });

    it('displays an error message for incorrect login credentials', () => {
      // Mock the backend response for failed login
      // This will be implemented once the backend is available
    });
  });

});