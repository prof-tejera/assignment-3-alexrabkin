describe("Workout", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("adds a Timer", () => {
    cy.get(".timer-container").should("not.exist");
    cy.contains("Add a Timer").click();
    cy.contains("Stopwatch Settings");
    cy.get(".form").find("input[type=number]").clear().type(5);
    cy.get(".form").find(".round-btn").click();
    cy.get(".seq-item");
    cy.contains("Back to Workout").click();
    cy.get(".timer-container");
    cy.get(".seq-item").each((item, index, list) => {
      expect(list).to.have.length(1);
    });
  });

  it("can remove a Timer", () => {
    cy.get(".seq-item-active").find(".close-btn").click();
    cy.get(".seq-item-active").should("not.exist");
    cy.get(".timer-container").should("not.exist");
  });

  it("adds multiple Timers", () => {
    cy.contains("Add a Timer").click();
    cy.contains("Stopwatch Settings");
    cy.get(".form").find(".round-btn").click();
    cy.contains("Countdown").click();
    cy.contains("Countdown Settings");
    cy.get(".form").find(".round-btn").click();
    cy.contains("XY").click();
    cy.contains("XY Settings");
    cy.get(".form").find(".round-btn").click();
    cy.contains("Tabata").click();
    cy.contains("Tabata Settings");
    cy.get(".form").find(".round-btn").click();

    cy.contains("Back to Workout").click();
    cy.get(".timer-container");
    cy.get(".seq-item").each((item, index, list) => {
      expect(list).to.have.length(4);
    });
  });
});
