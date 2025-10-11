describe('Privy Wallet Connection', () => {
  it('should open the Privy modal when "Connect Wallet" is clicked', () => {
    // Visit the local HTML file
    cy.visit('index.html');

    // Find and click the "Connect Wallet" button
    cy.get('#loginBtn').contains('Connect Wallet').click();

    // Wait for the Privy iframe to appear and be visible
    cy.get('iframe.privy-iframe').should('be.visible').then(($iframe) => {
      // It's generally not recommended to interact with the content of the iframe
      // directly in Cypress due to cross-origin restrictions.
      // However, we can at least verify that the iframe has loaded,
      // which is a good indication that the button is working.
      const iframeSrc = $iframe.attr('src');
      expect(iframeSrc).to.include('privy.io');
    });
  });
});