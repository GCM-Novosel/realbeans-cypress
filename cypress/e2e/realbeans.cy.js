describe("RealBeans Shopify webshop", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.unlockStoreIfNeeded();
  });

  it("shows the homepage intro text", () => {
    cy.get("main").should("contain.text", "Since 1801");
    cy.get("main").should("contain.text", "RealBeans");
    cy.get("main").should("contain.text", "Antwerp");
    cy.get("main").should("contain.text", "Ethically sourced");
  });

  it("shows the product catalog with the correct products", () => {
    cy.visit("/collections/all");
    cy.unlockStoreIfNeeded();

    cy.get("main").should("contain.text", "Blended coffee 5kg");
    cy.get("main").should("contain.text", "Roasted coffee beans 5kg");

    cy.get("main").should("contain.text", "From €55,00 EUR");
    cy.get("main").should("contain.text", "From €40,00 EUR");
  });

  it("sorts products by price from low to high", () => {
    cy.visit("/collections/all?sort_by=price-ascending");
    cy.unlockStoreIfNeeded();

    cy.get("main").then(($main) => {
      const pageText = $main.text();

      const roastedIndex = pageText.indexOf("Roasted coffee beans 5kg");
      const blendedIndex = pageText.indexOf("Blended coffee 5kg");

      expect(roastedIndex).to.be.greaterThan(-1);
      expect(blendedIndex).to.be.greaterThan(-1);
      expect(roastedIndex).to.be.lessThan(blendedIndex);
    });
  });

  it("shows the blended coffee product details correctly", () => {
    cy.visit("/products/blended-coffee-5kg");
    cy.unlockStoreIfNeeded();

    cy.get("main").should("contain.text", "Blended coffee 5kg");
    cy.get("main").should("contain.text", "€55,00 EUR");
    cy.get("main").should("contain.text", "RealBeans coffee, ready to brew.");

    cy.get("main").should("contain.text", "Robusta");
    cy.get("main").should("contain.text", "Excelsa");
    cy.get("main").should("contain.text", "Arabica");
    cy.get("main").should("contain.text", "Liberica");

    cy.get("main img").should("exist");
  });

  it("shows the roasted coffee product details correctly", () => {
    cy.visit("/products/roasted-coffee-beans-5kg");
    cy.unlockStoreIfNeeded();

    cy.get("main").should("contain.text", "Roasted coffee beans 5kg");
    cy.get("main").should("contain.text", "€40,00 EUR");
    cy.get("main").should(
      "contain.text",
      "Our best and sustainable real roasted beans."
    );

    cy.get("main").should("contain.text", "Robusta");
    cy.get("main").should("contain.text", "Excelsa");
    cy.get("main").should("contain.text", "Arabica");
    cy.get("main").should("contain.text", "Liberica");

    cy.get("main img").should("exist");
  });

  it("shows the About page with the RealBeans history paragraph", () => {
    cy.visit("/pages/about");
    cy.unlockStoreIfNeeded();

    cy.get("main").should("contain.text", "About");
    cy.get("main").should("contain.text", "From a small Antwerp grocery");
    cy.get("main").should("contain.text", "European coffee staple");
    cy.get("main").should("contain.text", "roasted in-house");
    cy.get("main").should("contain.text", "Antwerp or Stockholm");
  });
});