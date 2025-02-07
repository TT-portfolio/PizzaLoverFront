describe('Menu Page', () => {
  it("Click button to get to menu", () => {
    cy.visit("/")
    cy.getByData("Menu").click()
    cy.location("pathname").should("eq", "/Menu")
  })

  it("test search option", () => {
    cy.visit("/Menu")
    cy.getByData("Search").type("ox")
    cy.getByData("pizzaName").should("have.text", "Oxen special")
    
  })
})