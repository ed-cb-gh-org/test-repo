context("PRD", () => {
  // Logs in and creates initial application to run tests on.
  before(() => {
    // Intercept to get the app ID
    cy.intercept("POST", "/api/v1/github-repos/").as("postRequest");

    cy.apiLogin("sales");

    // Create the application before the tests and store its ID in Cypress.env
    const date = new Date().getTime();
    const appName = `Test App ${date}`;

    cy.visit("/");
    cy.cookieConsent();

    cy.createApp(appName);

    cy.logout();
  });

  // TODO: Use this one for testing purposes, as it is faster
  // beforeEach(() => {
  //   cy.apiLogin("sales");

  //   // navigate to a pre-existing application
  //   cy.visit(`/dashboard/app/810/planning`);

  //   cy.cookieConsent();
  // });

  // Always go back to the planning page before each test
  beforeEach(() => {
    cy.visit(`/`);

    // Check if logged out, if so log in
    cy.url().then((currentUrl) => {
      console.log("currentUrl", currentUrl);
      if (currentUrl.includes("login")) {
        cy.apiLogin("sales");

        cy.visit(`/dashboard/app/${Cypress.env("AppId")}/planning`);
      }
    });

    cy.cookieConsent();
  });

  /**
   * Covers:
   * - Generating a PRD and tests if app info is correct
   */
  it("Should be able to generate a PRD", () => {
    // Define a description for the application
    const description = "I want a simple todo application";

    cy.contains("span", "Write Product Requirements with AI", {
      timeout: 10000,
    }).should("be.visible");

    // Click the button to start creating a PRD with AI
    cy.getByDataCy("prd_main__create-prd-button").click();

    // Type the application description into the ProseMirror editor
    cy.get(".ProseMirror.toastui-editor-contents").type(description);

    // Click the 'Generate Build Plan' button to proceed with PRD generation
    cy.getByDataCy("generate_build_plan__generate-btn").click();

    // TODO: Switch to datacy when implemented
    // Wait for the 'Next Steps' button to be enabled, which indicates that the PRD generation is complete.
    // This wait can take up to 2 minutes (120,000 milliseconds).
    cy.contains("span", "Next Steps", { timeout: 120000 }).should("exist");

    // Verify that the PRD was generated successfully by checking if the 'App Info' section is clickable
    // and the description entered earlier appears in the editor
    cy.contains("div", "App Info").click();
    cy.contains("div.toastui-editor-contents", description);

    // Phase & Features tab
    cy.contains("div", "Phases & Features").click();

    // Wait for the spinner to disappear, marking it as finished loading
    cy.getByDataCy("cb_spinner", { timeout: 120000 }).should("not.exist");

    // start over
    cy.getByDataCy("cb-button-menu-main").eq(4).click();
    cy.getByDataCy("cb-tooltip-trigger").contains("Start Over").click();
    cy.getByDataCy("cb_modal__footer").find("button").last().click();

    cy.contains("span", "Write Product Requirements with AI").should("be.visible");
  });

  it("Should generate an empty PRD", () => {
    // Define a description for the application
    const description = "I want a simple todo application";

    // Click the button to start creating a PRD with AI
    cy.getByDataCy("prd_main__create-blank-prd-button").click();

    // Type the application description into the ProseMirror editor
    cy.get(".ProseMirror.toastui-editor-contents").type(description);

    // Click the 'Generate Build Plan' button to proceed with PRD generation
    cy.getByDataCy("generate_build_plan__generate-btn").click();

    // TODO: Switch to datacy when implemented
    // Check app info tab
    cy.contains("div", "App Info").click();
    cy.contains("div.toastui-editor-contents", description);

    // Check jira tab
    cy.contains("div", "Jira Issues").click();
    cy.getByDataCy("cb-tab-pane-jira-issues").contains(
      "Integrate Your Jira Issue List"
    );

    // Check Context Settings
    cy.contains("div", "Context Settings").click();
    cy.getByDataCy("cb-tab-pane-context-store").get("h4").contains("Context Settings");

    // Phase & Features tab
    cy.contains("div", "Phases & Features").click();

    // start over
    cy.getByDataCy("cb-button-menu-main").last().click();
    cy.getByDataCy("cb-tooltip-trigger").contains("Start Over").click();
    cy.getByDataCy("cb_modal__footer").find("button").last().click();
    cy.contains("span", "Write Product Requirements with AI").should("be.visible");
  });
});
