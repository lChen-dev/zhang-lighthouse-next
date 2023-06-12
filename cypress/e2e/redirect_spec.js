describe('Redirect', () => {
  it('can redirect to a simple URL', () => {
    const url = 'google.com';
    cy.visit(`/redirect?url=${url}`);
    cy.url().should('include', url);
  });

  it('redirects to home when using a bad URL', () => {
    const url = 'not-a-url';
    cy.visit(`/redirect?url=${url}`);
    cy.url().should('include', 'localhost');
  });

  it('redirects to a URL with query parameters', () => {
    const url = 'https://www.google.com/search?q=lighthouse&q=apartments';
    cy.visit(`/redirect?url=${url}`);
    cy.url().should('eq', url);
  });
});
