
describe('localhost:3000 is up', () => {
  it('passes visit', () => {
    cy.visit('http://localhost:3000')
  })

  it('can login',()=>{
    cy.login(Cypress.env('userId'));
  })

  it('it access to new event page',()=>{
      cy.get('[data-test-id="user-logged-avatar"]').click()
      cy.get('[data-test-id="new-event-link"]').click();
     cy.get('[data-test-id="event-form"]')


  })

  const EVENT_TEST_NAME = 'TEST EVENT'
  it('can create a test event ',()=>{
    cy.get('[name="title"]').type(EVENT_TEST_NAME)
    cy.get('[data-test-id="submit-event-form"]').click();
    cy.get('[data-test-op="editing-event"]')
  })

  it('can edit test event',()=>{
     cy.visit('http://localhost:3000/profile');
     cy.get('[data-test-id="user-events-created"]')
       .contains(EVENT_TEST_NAME)
       .click();
       cy.get('[data-test-id="edit-event"]').click()
     cy.get('[name="resume"]').type(`this is a small resume to edit ${EVENT_TEST_NAME}`);
    cy.get('[data-test-id="submit-event-form"]').click();

  })

  it('can delete test event',()=>{
    cy.visit('http://localhost:3000/profile')
    cy.get('[data-test-id="user-events-created"]').contains(EVENT_TEST_NAME).click()
    cy.get('[data-test-id="delete-event-option"]').click()
    cy.get('[data-test-id="delete-modal-delete-button"]').click();
  })


  
})

export {}