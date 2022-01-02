describe("Form", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  // Stopwatch Form Tests

  it("it has a Stopwatch form", () => {
    cy.contains("Add a Timer").click();
    cy.contains("Stopwatch Settings");
  });

  it("can add a new Stopwatch sequence", () => {
    cy.get(".form").find("input[type=number]").clear().type(5);
    cy.get(".form").find(".round-btn").click();
    cy.get(".seq-item");
  });

  it("can remove a sequence", () => {
    cy.get(".seq-item-active").find(".close-btn").click();
    cy.get(".seq-item-active").should("not.exist");
  });

  it("can't add an negative number", () => {
    cy.get(".form").find("input[type=number]").clear().type(-1);
    cy.get(".form").find(".round-btn").click();
    cy.contains("Please enter a value greater than 0.");
    cy.get(".seq-item").should("not.exist");
  });

  it("can't add 0", () => {
    cy.get(".form").find("input[type=number]").clear().type(0);
    cy.get(".form").find(".round-btn").click();
    cy.contains("Please enter a value greater than 0.");
    cy.get(".seq-item").should("not.exist");
  });

  it("can't add a blank", () => {
    cy.get(".form").find("input[type=number]").clear();
    cy.get(".form").find(".round-btn").click();
    cy.contains("Please enter a value greater than 0.");
    cy.get(".seq-item").should("not.exist");
  });

  // Countdown Form Tests

  it("it has a Countdown form", () => {
    cy.contains("Countdown").click();
    cy.contains("Countdown Settings");
  });

  it("can add a new Countdown sequence", () => {
    cy.get(".form").find("input[type=number]").clear().type(5);
    cy.get(".form").find(".round-btn").click();
    cy.get(".seq-item");
  });

  it("can remove a sequence", () => {
    cy.get(".seq-item-active").find(".close-btn").click();
    cy.get(".seq-item-active").should("not.exist");
  });

  it("can't add an negative number", () => {
    cy.get(".form").find("input[type=number]").clear().type(-1);
    cy.get(".form").find(".round-btn").click();
    cy.contains("Please enter a value greater than 0.");
    cy.get(".seq-item").should("not.exist");
  });

  it("can't add 0", () => {
    cy.get(".form").find("input[type=number]").clear().type(0);
    cy.get(".form").find(".round-btn").click();
    cy.contains("Please enter a value greater than 0.");
    cy.get(".seq-item").should("not.exist");
  });

  it("can't add a blank", () => {
    cy.get(".form").find("input[type=number]").clear();
    cy.get(".form").find(".round-btn").click();
    cy.contains("Please enter a value greater than 0.");
    cy.get(".seq-item").should("not.exist");
  });

  // XY Form Tests

  it("it has a XY form", () => {
    cy.contains("XY").click();
    cy.contains("XY Settings");
    cy.contains("Please enter a value greater than 0.").should("not.exist");
  });

  it("can add a new XY sequence", () => {
    cy.get(".form").find(".round-btn").click();
    cy.get(".seq-item");
  });

  it("can remove a sequence", () => {
    cy.get(".seq-item-active").find(".close-btn").click();
    cy.get(".seq-item-active").should("not.exist");
  });

  it("it contains 2 input fields", () => {
    cy.get(".form input[type=number]").each((item, index, list) => {
      expect(list).to.have.length(2);
    });
  });

  it("it can't enter a 0", () => {
    cy.get(".form input[type=number]").each((item, index, list) => {
      cy.wrap(item).clear().type(0);
    });

    cy.get(".form").find(".round-btn").click();
    cy.contains("Please enter a value greater than 0.");
  });

  it("it can't enter a blank", () => {
    cy.get(".form input[type=number]").each((item, index, list) => {
      cy.wrap(item).clear();
    });

    cy.get(".form").find(".round-btn").click();
    cy.contains("Please enter a value greater than 0.");
  });

  it("it can't enter a negative", () => {
    cy.get(".form input[type=number]").each((item, index, list) => {
      cy.wrap(item).clear().type(-1);
    });

    cy.get(".form").find(".round-btn").click();
    cy.contains("Please enter a value greater than 0.");
  });

  // Tabata Form Tests

  it("it has a Tabata form", () => {
    cy.contains("Tabata").click();
    cy.contains("Tabata Settings");
    cy.contains("Please enter a value greater than 0.").should("not.exist");
  });

  it("can add a new Tabata sequence", () => {
    cy.get(".form").find(".round-btn").click();
    cy.get(".seq-item");
  });

  it("can remove a sequence", () => {
    cy.get(".seq-item-active").find(".close-btn").click();
    cy.get(".seq-item-active").should("not.exist");
  });

  it("it contains 3 input fields", () => {
    cy.get(".form input[type=number]").each((item, index, list) => {
      expect(list).to.have.length(3);
    });
  });

  it("it can't enter a 0", () => {
    cy.get(".form input[type=number]").each((item, index, list) => {
      cy.wrap(item).clear().type(0);
    });

    cy.get(".form").find(".round-btn").click();
    cy.contains("Please enter a value greater than 0.");
  });

  it("it can't enter a blank", () => {
    cy.get(".form input[type=number]").each((item, index, list) => {
      cy.wrap(item).clear();
    });

    cy.get(".form").find(".round-btn").click();
    cy.contains("Please enter a value greater than 0.");
  });

  it("it can't enter a negative", () => {
    cy.get(".form input[type=number]").each((item, index, list) => {
      cy.wrap(item).clear().type(-1);
    });

    cy.get(".form").find(".round-btn").click();
    cy.contains("Please enter a value greater than 0.");
  });
});
