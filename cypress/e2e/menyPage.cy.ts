describe('Menu Page', () => {
  it("Click button to get to menu", () => {
    cy.visit("http://localhost:3000")
    cy.getByData("Menu").click()
    cy.location("pathname").should("eq", "/Menu")
  })

  it("test search option", () => {
    cy.visit("http://localhost:3000/Menu")
    cy.getByData("Search").type("ox")
    cy.getByData("pizzaName").should("have.text", "Oxen special")
    
  })
})