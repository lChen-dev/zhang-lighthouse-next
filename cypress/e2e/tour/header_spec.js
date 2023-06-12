describe('Header Tour', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('can navigate to "Get Started"', () => {
    cy.contains('nav a', 'Get Started').click();
    cy.url().should('include', '/start');
  });

  it('can navigate to "About"', () => {
    cy.contains('nav a', 'About').click();
    cy.url().should('include', '/about');
  });

  it('can navigate to "FAQ"', () => {
    cy.contains('nav a', 'FAQ').click();
    cy.url().should('include', '/faq');
  });

  it('shows "Login" when not logged in', () => {
    cy.logout().then(() => {
      cy.contains('nav a', 'Login')
        .should('have.attr', 'href')
        .and('include', '/api/login');
    });
  });

  it('can navigate to "Account" when logged in', () => {
    cy.signIn().then(() => {
      cy.visit('/');
      cy.contains('nav a', 'Account').click();
      cy.url().should('include', '/account/rewards');
    });
  });

  it('shows logout icon when logged in', () => {
    cy.signIn().then(() => {
      cy.visit('/');
      cy.get('a[title="Sign Out"]')
        .should('have.attr', 'href')
        .and('include', '/api/logout');
    });
  });
});
