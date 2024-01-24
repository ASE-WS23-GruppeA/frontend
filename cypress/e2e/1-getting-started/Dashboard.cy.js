/// <reference types="cypress" />

describe('FrontendTest Log-in Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })
  

  describe('Navigation Test Dashboard', () => {
    beforeEach(() => {
      
      cy.visit('http://localhost:4200/dashboard');
    });

  it('should navigate to my profile when add workout button is clicked', () => {
   
    cy.get('a.btn.btnPrimary').click();

    cy.url().should('include', '/new-workout');

   
});
});

});