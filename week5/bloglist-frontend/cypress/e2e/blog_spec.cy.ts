/// <reference types="cypress" />

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testRoute/reset")
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("Login").click()
    cy.contains("username")
    cy.contains("password")
    cy.contains("cancel")
  })
  describe("Login", function () {
    beforeEach(function () {
      const testUser = {
        username: "testuser",
        name: "testname",
        password: "testpassword123",
      }

      cy.request("POST", "http://localhost:3003/api/users", testUser)
      cy.visit("http://localhost:3000")
    })

    it("with correct credentials is successful", function () {
      cy.contains("Login").click()
      cy.contains("username")
      cy.get("#username").type("testuser")
      cy.get("#password").type("testpassword123")
      cy.get("#loginButton").click()

      cy.contains("Login successful")
    })
    it("with incorrect credentials it fails", function () {
      cy.contains("Login").click()
      cy.contains("username")
      cy.get("#username").type("wrong")
      cy.get("#password").type("tesrd123")
      cy.get("#loginButton").click()

      cy.contains("Username and/or password incorrect")
    })
    describe("While logged in", function () {
      beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/login", {
          username: "testuser",
          password: "testpassword123",
        }).then((response) => {
          localStorage.setItem("loggedUser", JSON.stringify(response.body))
        })
        cy.visit("http://localhost:3000")
      })

      it("can create a blog", function () {
        cy.contains("New Blog").click()
        cy.contains("Title")

        cy.get("#title").type("testTitle")
        cy.get("#author").type("testAuthor")
        cy.get("#url").type("testUrl")
        cy.get("#submitBlog").click()

        cy.contains("Creation of testTitle successful")
      })

      describe("Created blogs", function () {
        beforeEach(function () {
          const token = JSON.parse(
            localStorage.getItem("loggedUser") as string
          ).token
          if (!token) throw new Error()

          cy.request({
            method: "POST",
            url: "http://localhost:3003/api/blogs",
            body: {
              title: "testTitle",
              author: "testAuthor",
              url: "testUrl",
            },
            headers: {
              Authorization: `bearer ${token}`,
            },
          })
          cy.visit("http://localhost:3000")
        })
        it("can be liked", function () {
          cy.contains("show").click()
          cy.get("#likeButton").click()
          cy.contains("likes: 1")
        })
        it("can be deleted", function () {
          cy.contains("show").click()
          cy.get("#deleteButton").click()
          cy.get("html").should("not.contain", "testTitle")
        })
        it.only("blogs are ordered by likes", function () {
          const token = JSON.parse(
            localStorage.getItem("loggedUser") as string
          ).token
          if (!token) throw new Error()
          cy.request({
            method: "POST",
            url: "http://localhost:3003/api/blogs",
            body: {
              title: "2nd title",
              author: "2nd Author",
              url: "2nd Url",
            },
            headers: {
              Authorization: `bearer ${token}`,
            },
          })
          cy.visit("http://localhost:3000")
          cy.get("#show").click()
          cy.contains("2nd title").get("#show").click()
          cy.contains("2nd title").parent().find("#likeButton").click()
          
          cy.get(".blog").eq(1).should("contain", "2nd title")
        })
      })
    })
  })
})
