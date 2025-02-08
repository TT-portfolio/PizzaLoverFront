import "cypress-axe"

describe('Accessibility Testing Menu page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.injectAxe();  // Laddar in axe-core i sidan
    });
    
    it('Should have no detectable accessibility violations on HomePage', () => {
      cy.checkA11y();  // Kör tillgänglighetstester
    });
    
    it('Should have no detectable accessibility violations on MenuPage', ()=> {
      cy.visit("/Menu")
      cy.injectAxe();  // Laddar in axe-core i sidan
      cy.get('h1').should('be.visible'); 
      cy.checkA11y()
    })
  });
  