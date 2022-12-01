describe('localhost:3000 is up', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })

  it('can login', () => {
    cy.login(Cypress.env('userId'))
  })

  it('can acces to user profile', () => {
    cy.get('[data-test-id="user-logged-avatar"]').click()
    cy.contains('Profile').click()
  })

  it('it render user created events', () => {
    cy.contains('Profile').click()
    cy.get('[data-test-id="user-events-created"]')
  })
})

export {}
