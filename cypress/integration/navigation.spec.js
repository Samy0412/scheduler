describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    // Get request to the home page to load teh content
    cy.visit("/");
    // Check that the day selected (Tuesday) has the class "selected" which gives a white background
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
