// Not full test coverage, but will test the Form and basic app features

describe("Cypress", () => {
  it("is working", () => {
    expect(true).to.equal(true);
  });

  it("opens the app", () => {
    cy.visit("http://localhost:3000");
  });

  it("it has an add button", () => {
    cy.contains("Add a Timer");
  });
});
