import "cypress-axe"

describe('Accessibility Testing Menu page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.injectAxe();  // Laddar in axe-core i sidan
    });
    
    it('Should have no detectable accessibility violations on MenuPage', () => {
      cy.visit('/');
      cy.injectAxe();
      cy.checkA11y(null, null, (violations) => {
        // Log detailed violations to the console when using cypress open
        console.log('Accessibility violations:', violations);
      }, true);
    });
    
    it('Should have no detectable accessibility violations on HomePage', () => {
      cy.visit('/');
      cy.injectAxe();
      cy.checkA11y(null, null, (violations) => {
        // Log detailed violations to the console when using cypress open
        console.log('Accessibility violations:', violations);
      }, false);
    });
  });
  