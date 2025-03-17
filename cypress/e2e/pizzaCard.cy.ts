describe("PizzaCard Component", () => {
    beforeEach(()=> {
        cy.visit("/Menu")
    });

    it("Show pizza name and correct price", ()=> {
        cy.getByData("pizzaName").should("exist")
        cy.getByData("pizzaPrice").should("exist")
    })

    it("Show ingridiens as standard", ()=> {
        cy.getByData("pizzaDescriptionOrIngredients").should("have.length.greaterThan", 0)
    })

    it("Is toggle between ingridiens and description working", () => {
        cy.getByData("pizzaCard").eq(0)
        .within(()=> {
            cy.getByData("toggleButton").click({ multiple: true })
            .should("contain.text", "Ingridienser")
            .should("not.contain.text", "Beskrivning")
        })
    })

    it("Is image loaded", () => {
        cy.getByData("pizzaImage").should("exist")
    })
})