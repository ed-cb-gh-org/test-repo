context("Login", () => {
  /**
   * Covers:
   * - Logging in
   * - Logging out
   */
  it("should login to the application as a sales user", () => {
    // Custom command for logging in as a sales user
    cy.loginAs("sales");

    // test that the app list loads before logging out
    // (logging out too fast causes issues with requests ending while not logged in)
    cy.get(".app-list").get(".overlay-wrapper").should("not.exist");

    // Custom command to log the user out
    cy.logout();

    // Ensure the user is redirected to the login page after logging out
    cy.get("h4").should("contain", "Login to Crowdbotics");
  });
});
