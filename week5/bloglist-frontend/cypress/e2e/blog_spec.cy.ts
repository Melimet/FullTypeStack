/// <reference types="cypress" />

describe('Blog app', function () {
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
  describe('Login', function () {
    beforeEach(function () {
     const testUser = {
      username: "testuser",
      name: "testname",
      password: "testpassword123",
    }
    cy.request('POST', 'http://localhost:3003/api/users', testUser)
    cy.visit('http://localhost:3000')

 
    })
    it('with correct credentials is successful', function() {
      cy.contains("Login").click()
      cy.contains("username")
      cy.get('#username').type("testuser")
      cy.get('#password').type("testpassword123")
      cy.get("#loginButton").click()

      cy.contains("Login successful")
    })
    it('with incorrect credentials it fails', function () {
      cy.contains("Login").click()
      cy.contains("username")
      cy.get('#username').type("wrong")
      cy.get('#password').type("tesrd123")
      cy.get("#loginButton").click()

      cy.contains("Username and/or password incorrect")
    })
  })
})