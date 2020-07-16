describe("Appointments", () => {
  //Theses steps are commun to all tests and will be ran before each test
  beforeEach(() => {
    // Reset the scheduler_test database
    cy.request("GET", "/api/debug/reset");
    // Get request to the home page to load teh content
    cy.visit("/");
    // Check that the contente is loaded if "Monday" is in the document
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    //1. Click on the add icon
    cy.get("[alt=Add]").first().click();

    //2. Find the input field and type the student name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    //3. Choose the interviewer in the list
    cy.get("[alt= 'Sylvia Palmer']").click();

    //4. Click on the button with text "Save"
    cy.contains("Save").click();

    //5. Check that the appointment is in show mode with the name of the student and the name of the interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    //1. Click on the Edit icon when hovering on the appointment (force click)
    cy.get("[alt=Edit]").first().click({ force: true });

    //2. Find the input field and clear the value, type a new student name and choose new interviewer
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    //3. Click on the button with "Save" text
    cy.contains("Save").click();

    //4. Check that the appointment is in show mode with the name of the student and the name of the interviewer updated
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    //1. Click on the Delete icon when hovering on the appointment (force click)
    cy.get("[alt=Delete]").first().click({ force: true });

    //2. Click on the button with "Confirm" text
    cy.contains("Confirm").click();

    //3. Check that we see "Deleting..."
    cy.contains("Deleting...").should("exist");

    //4. Check that Deleting has disappeared
    cy.contains("Deleting...").should("not.exist");

    //5. Check that the appointment doesn't exist anymore
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
