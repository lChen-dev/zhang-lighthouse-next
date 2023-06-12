describe('Footer Tour', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('can navigate to "How It Works"', () => {
    cy.get('footer')
      .contains('How it works')
      .click();
    cy.url().should('include', '/learn');
  });

  it('can navigate to "FAQ"', () => {
    cy.get('footer')
      .contains('FAQ')
      .click();
    cy.url().should('include', '/faq');
  });

  it('can navigate to "About"', () => {
    cy.get('footer')
      .contains('About us')
      .click();
    cy.url().should('include', '/about');
  });

  it('can navigate to "Privacy"', () => {
    cy.get('footer')
      .contains('Privacy')
      .click();
    cy.url().should('include', '/privacy');
  });

  it('can navigate to "Terms"', () => {
    cy.get('footer')
      .contains('Terms of Service')
      .click();
    cy.url().should('include', '/terms');
  });

  it('can navigate to "Get Started"', () => {
    cy.get('footer')
      .contains('Get Started')
      .click();
    cy.url().should('include', '/start');
  });
});
