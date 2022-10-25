
describe('localhost:3000 is up', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })

  it('can login',()=>{
    cy.login(Cypress.env('userId'));
  })

  it('it access to new event',()=>{
      cy.get('[data-test-id="user-logged-avatar"]').click()
      cy.get('[data-test-id="new-event-link"]').click();
     cy.get('[data-test-id="event-form"]')
  })
  
})

export {}