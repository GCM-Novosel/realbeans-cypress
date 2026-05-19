Cypress.Commands.add("unlockStoreIfNeeded", () => {
  cy.get("body").then(($body) => {
    const passwordInput = $body.find('input[name="password"]');

    if (passwordInput.length > 0) {
      cy.get('input[name="password"]').type(Cypress.env("SHOPIFY_PASSWORD"), {
        log: false,
      });

      cy.get('button[type="submit"], input[type="submit"]').first().click();

      cy.url().should("not.include", "/password");
    }
  });
});