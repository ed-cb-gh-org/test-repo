context("Smoke Test", () => {
  before(() => {
    // Intercept request to capture app ID during app creation
    cy.intercept("POST", "/api/v1/github-repos/").as("postRequest");

    // Log in as a sales user via API
    cy.apiLogin("sales");

    // Generate a unique application name based on the current timestamp
    const date = new Date().getTime();
    const appName = `Test App ${date}`;

    // Visit the homepage and decline cookies
    cy.visit("/");
    cy.cookieConsent();

    // Create a new app and log out
    cy.createApp(appName);
    cy.logout();
  });

it("Create a Jira ticket for a PRD feature", () => {
    // select a feature with an associated jira ticket
    // unlink the ticket
    // Confirm ticket is unlinked
    const description = "I want a simple todo application";
    const FeatureTitle = "Feature title of feature to be deleted";

    // Log in again as a sales user
    cy.apiLogin("sales");

    // Navigate to the planning page of the app (using stored AppId)
    cy.visit(`/dashboard/app/${Cypress.env("AppId")}/planning`);

    // Click the button to create an empty PRD
    cy.getByDataCy("prd_main__create-blank-prd-button").click();

    // Input description into the ProseMirror editor
    cy.get(".ProseMirror.toastui-editor-contents").type(description);

    // Click 'Generate Build Plan' to create the PRD
    cy.getByDataCy("generate_build_plan__generate-btn").click();

    // Click 'Add Feature Manually' button
    cy.contains("button", "Add Feature Manually").click();

    // Enter the feature title
    cy.getByDataCy("cb_text_input").type(FeatureTitle);

    // Click 'Add Feature' to add the new feature
    cy.getByDataCy("cb_modal__footer").contains("button", "Add Feature").click();
})

it("Link a Jira ticket to a PRD feature", () => {
  // select a feature without a jira ticket
  // link the jira ticket to the feature
  // Confirm ticket is linked
})

  it("Confirm categories can be deleted after PRD generation", () => {
    // const description = "I want a simple todo application";
    // const FeatureTitle = "Feature title of feature to be deleted";

    // // Log in again as a sales user
    // cy.apiLogin("sales");

    // // Navigate to the planning page of the app (using stored AppId)
    // cy.visit(`/dashboard/app/${Cypress.env("AppId")}/planning`);

    // // Click the button to create an empty PRD
    // cy.getByDataCy("prd_main__create-blank-prd-button").click();

    // // Input description into the ProseMirror editor
    // cy.get(".ProseMirror.toastui-editor-contents").type(description);

    // // Click 'Generate Build Plan' to create the PRD
    // cy.getByDataCy("generate_build_plan__generate-btn").click();

    // // Click 'Add Feature Manually' button
    // cy.contains("button", "Add Feature Manually").click();

    // // Enter the feature title
    // cy.getByDataCy("cb_text_input").type(FeatureTitle);

    // // Click 'Add Feature' to add the new feature
    // cy.getByDataCy("cb_modal__footer").contains("button", "Add Feature").click();

    // // Delete the added feature by clicking the delete icon
    // cy.get('[class*="SelectedPhaseFeature_icon_button"]').click();

    // // Confirm deletion in the modal footer
    // cy.get('[data-cy="cb_modal__footer"]').contains("button", "Yes").click();

    // // Assert the feature is no longer present in the DOM
    // cy.contains("div", FeatureTitle).should("not.exist");

    // // Log out at the end of the test
    // cy.logout();
  });
});
