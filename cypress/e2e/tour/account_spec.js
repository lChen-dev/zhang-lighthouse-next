describe('Account Pages', () => {
  beforeEach(() => {
    cy.signIn().then(() => {
      cy.visit('/account/rewards');
    });
  });

  it('can navigate', () => {
    cy.url().should('include', '/account/rewards');
  });
});
