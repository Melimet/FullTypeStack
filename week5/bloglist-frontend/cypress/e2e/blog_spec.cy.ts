describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testRoute/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains("Login").click()
    cy.contains("username")
    cy.contains("password")
    cy.contains("cancel")
  })
})