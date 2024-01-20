/// <reference types="cypress" />

describe('FrontendTest New-Workout Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/new-workout')
    //cy.wait('@getExercises');
    //cy.intercept('GET', 'http://localhost:3333/exercises').as('getExercises');
  });
  
  // Initialization and muscle group display
  it('should display muscle groups on initialization', () => {
    // Check for one .cards container
    cy.get('.muscle-groups-container .cards').should('have.length', 1);

    // Within that container, check for multiple .card elements
    cy.get('.muscle-groups-container .cards .card').should('have.length', 10);
    cy.get('.muscle-groups-container .cards .card').each(($card, index) => {
      // The src should include the path to the muscle group images
      cy.wrap($card).find('img').should('have.attr', 'src').and('include', 'assets/muscle_groups');
      // The card should contain non-empty text corresponding to the muscle group name
      cy.wrap($card).should('contain.text', $card[0].innerText.trim());
    });
  });

// selecting a muscle group
it('should display exercises when a muscle group is selected', () => {
  cy.get('.muscle-groups-container .card').first().click();
  cy.get('.exercise-list-container').should('be.visible');
  cy.get('.exercise-list-container h3').should('contain.text', '');
  cy.get('.exercise-list-container ul li').should('have.length.at.least', 1);
});

 // selecting an exercise
 it('should display sets when an exercise is selected', () => {
   cy.get('.muscle-groups-container .card').first().click();
   cy.get('.exercise-list-container ul li').first().click();
   cy.get('.exercise-sets-container').should('be.visible');
   cy.get('.exercise-sets-container h3').should('contain.text', '');
   cy.get('.exercise-sets-container .rep-weight-set').should('have.length', 3);
 });

  //adding and deleting sets
  it('should add a new set', () => {
    cy.get('.muscle-groups-container .card').first().click();
    cy.get('.exercise-list-container ul li').first().click();
    cy.get('.btn-addSet').click();
    cy.get('.exercise-sets-container .rep-weight-set').should('have.length', 4);
  });

  it('should delete a set', () => {
    cy.get('.muscle-groups-container .card').first().click();
    cy.get('.exercise-list-container ul li').first().click();
    cy.get('.btn-deleteSet').first().click();
    cy.get('.exercise-sets-container .rep-weight-set').should('have.length', 2);
  });

  // saving sets
  it('should enable the save button when valid set values are entered', () => {
    // Click to select a muscle group and an exercise
    cy.get('.muscle-groups-container .card').first().click();
    cy.get('.exercise-list-container ul li').first().click();

    // Fill in the sets with valid positive values to enable the 'Save Set' button
    cy.get('.exercise-sets-container .rep-weight-set').each(($set, index) => {
      cy.wrap($set).find('input[type="number"]').first().clear().type('10'); // Repetitions
      cy.wrap($set).find('input[type="number"]').last().clear().type('20');  // Kilos
    });

    // Now the 'Save Set' button should be enabled
    cy.get('.btn-save').should('not.be.disabled').click();

    // After saving, check if the workout container is visible and has at least one saved exercise
    cy.get('.workout-container').should('be.visible');
    cy.get('.workout-container .saved-exercises .exercise-item').should('have.length.at.least', 1);
  });


  it('should disable save set button for invalid input', () => {
    cy.get('.muscle-groups-container .card').first().click();
    cy.get('.exercise-list-container ul li').first().click();
    cy.get('.exercise-sets-container input[type="number"]').first().clear().type('-1');
    cy.get('.btn-save').should('be.disabled');
  });

  //// deleting saved exercises from workout
  //it('should delete a saved exercise from the workout', () => {
  //  // Assuming an exercise has already been saved
  //  cy.get('.btn-deleteExercise').first().click();
  //  cy.get('.workout-container .saved-exercises .exercise-item').should('have.length', 0);
  //});

  //// finalizing workout
  //it('should save the workout', () => {
  //  // Assuming exercises have been added
  //  cy.get('.workout-container input[type="text"]').type('My Workout');
  //  cy.get('.btn-saveWorkout').click();
  //  // Mock the backend response and verify the result
  //});

 // it('should validate workout before saving', () => {
 //   cy.get('.btn-saveWorkout').should('be.disabled');
 // });
//
  // UI elements and interactions
  it('should have all UI elements interactive', () => {
    // Check for the presence and interactivity of muscle group cards
    cy.get('.muscle-groups-container .card').should('have.length', 10).and('be.visible');
    cy.get('.muscle-groups-container .card').first().click();
    cy.get('.exercise-list-container').should('be.visible');

    // Verify exercise list interactivity
    cy.get('.exercise-list-container ul li').should('have.length.at.least', 1).and('be.visible');
    cy.get('.exercise-list-container ul li').first().click();
    cy.get('.exercise-sets-container').should('be.visible');

    // Check for input fields and buttons in the exercise sets container
    cy.get('.exercise-sets-container input[type="number"]').should('have.length', 6).and('be.visible');
    cy.get('.btn-addSet').should('be.visible').and('be.enabled');
    cy.get('.btn-addSet').click();
    cy.get('.btn-deleteSet').should('have.length.at.least', 1).and('be.visible');

    // Now we fill in the sets and save to make the workout container visible
    cy.get('.exercise-sets-container .rep-weight-set input[type="number"]').each(($el, index) => {
      // Assuming 10 reps and 20 kilos for each set
      cy.wrap($el).clear().type(index % 2 === 0 ? '10' : '20');
    });

    cy.get('.btn-save').click(); // Assuming this button is to save the sets

    // After saving sets, the workout container should be visible
    cy.get('.workout-container').should('be.visible');
    cy.get('.workout-container input[type="text"]').should('be.visible');
    cy.get('.btn-saveWorkout').should('be.visible');
  });

});