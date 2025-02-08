describe("Navbar Component", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000"); // Byt till din lokala URL
    });
  
    it("Displays navbar correctly", () => {
      cy.get("nav").should("be.visible");
      cy.contains("Hem").should("be.visible");
      cy.contains("Meny").should("be.visible");
    });
  
    it("Navigates to the correct pages", () => {
      cy.contains("Meny").click();
      cy.url().should("include", "/Menu");
  
      cy.contains("Hem").click();
      cy.url().should("eq", "http://localhost:3000/");
    });
  
    it("Opens and closes the mobile menu", () => {
      cy.viewport(320, 600); // Simulerar mobilskärm
  
      // Menyn ska inte vara synlig från början
      cy.get("[data-testid=mobile-menu]").should("not.exist");
  
      // Klicka på hamburgermenyn
      cy.get("button[aria-label='Öppna meny']").click();
  
      // Nu ska menyn vara synlig
      cy.get("[data-testid=mobile-menu]").should("be.visible");
  
      // Klicka igen för att stänga
      cy.get("button[aria-label='Stäng meny']").click();
      cy.get("[data-testid=mobile-menu]").should("not.exist");
    });
  
    it("Navigates correctly using mobile menu links", () => {
      cy.viewport(320, 600); // Simulerar mobilskärm
  
      // Öppna hamburgermenyn
      cy.get("button[aria-label='Öppna meny']").click();
      cy.get("[data-testid=mobile-menu]").should("be.visible");
  
      // Klicka på "Meny" i mobilmenyn
      cy.get("[data-testid=mobile-menu-link]").contains("Meny").click();
      cy.url().should("include", "/Menu");
  
      // Öppna hamburgermenyn igen
      cy.get("button[aria-label='Öppna meny']").click();
  
      // Klicka på "Hem" i mobilmenyn
      cy.get("[data-testid=mobile-menu-link]").contains("Hem").click();
      cy.url().should("eq", "http://localhost:3000/");
    });
  });
  