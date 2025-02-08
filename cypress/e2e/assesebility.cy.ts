import "cypress-axe"

describe('Accessibility Testing', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/Menu');
      cy.injectAxe();  // Laddar in axe-core i sidan
    });
  
    it('Should have no detectable accessibility violations', () => {
      cy.get('h1').should('be.visible'); 
      cy.checkA11y();  // Kör tillgänglighetstester
    });
  });
  