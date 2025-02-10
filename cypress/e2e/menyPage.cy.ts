/// <reference types="cypress" />


describe('Menu Page', () => {
  it("Click button to get to menu", () => {
    cy.visit("/")
    cy.getByData("Menu").click()
    cy.location("pathname").should("eq", "/Menu")
  })

  it("test search option with correct return", () => {
    cy.visit("/Menu")
    cy.getByData("Search").type("ox")
    cy.getByData("pizzaName").should("have.text", "Oxen special")
    
  })

  it("Search with no return", () => {
    cy.visit("/Menu")
    cy.getByData("Search").type("Inget resultat")
    cy.getByData("NoResult").should("have.text", "Inga pizzor matchar dina filter.")
  })
})