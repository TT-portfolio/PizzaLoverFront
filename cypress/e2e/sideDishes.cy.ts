describe("Side Dishes Section", () => {
  beforeEach(() => {
    cy.intercept("GET", "**content?filter=contentType:sideDishObj**", {
      statusCode: 200,
      body: [
        {
          properties: {
            sideDishName: "Test Dip",
            sideDishCategory: "saucesAndDips",
          },
        },
      ],
    }).as("getSideDishes");

    cy.visit("/");
  });

  it("should load the side dishes correctly", () => {
    cy.wait("@getSideDishes");
    cy.get("[data-test=sideDishesSection]").should("exist");
    cy.get("[data-test=sideDishesSection]").should("be.visible");
  });
});
