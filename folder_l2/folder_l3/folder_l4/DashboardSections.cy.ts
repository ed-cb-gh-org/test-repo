context("Dashboard", () => {
  /**
   * Covers:
   * - Logging in via api login
   */
  it("Test that navigates and makes sure all plan account sections exist", () => {
    cy.apiLogin("sales");

    cy.visit("/");
    cy.cookieConsent();

    // Confirm the presence of buttons with specific text
    cy.get(".cb-button__content").contains("Create App").should("exist");
    cy.get(".cb-button__content").contains("Knowledge Docs").should("exist");
    cy.get(".cb-button__content").contains("Module Catalog").should("exist");
    cy.get(".cb-button__content").contains("Share Idea").should("exist");
    cy.get(".cb-button__content").contains("Join Research Panel").should("exist");

    // Confirm the presence of the <h6> element with the text "Apps list"
    cy.get("h6").contains("Apps list").should("exist");

    // Confirm at least one app is listed
    cy.get('a[href^="/dashboard/app/"]')
      .filter((index, element) => {
        const href = Cypress.$(element).attr("href");
        const numberPattern = /\/dashboard\/app\/\d+/; // Regex pattern to check for /dashboard/app/ followed by numbers
        return numberPattern.test(href);
      })
      .should("have.length.greaterThan", 0);

    cy.logout();
  });

  it("Test that navigates and makes sure all enterprise sections exist", () => {
    cy.apiLogin("ent");

    cy.visit("/");
    cy.cookieConsent();

    // Confirm the presence of buttons with specific text
    cy.get(".cb-button__content").contains("Create App").should("exist");
    cy.get(".cb-button__content").contains("Enterprise Dashboard").should("exist");
    cy.get(".cb-button__content").contains("Knowledge Docs").should("exist");
    cy.get(".cb-button__content").contains("Module Catalog").should("exist");
    cy.get(".cb-button__content").contains("Share Idea").should("exist");
    cy.get(".cb-button__content").contains("Join Research Panel").should("exist");

    // Confirm the presence of the <h6> element with the text "Apps list"
    cy.get("h6").contains("Apps list").should("exist");

    // Confirm at least one app is listed
    cy.get('a[href^="/dashboard/app/"]')
      .filter((index, element) => {
        const href = Cypress.$(element).attr("href");
        const numberPattern = /\/dashboard\/app\/\d+/; // Regex pattern to check for /dashboard/app/ followed by numbers
        return numberPattern.test(href);
      })
      .should("have.length.greaterThan", 0);

    cy.logout();
  });
});
