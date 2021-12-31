/// <reference types="cypress" />

function fillWithValidData() {
  cy.get("[data-cy=firstName]").type("Simpel");
  cy.get("[data-cy=lastName]").type("Web");
  cy.get("[data-cy=category]").select("A");
}

function assertCorrectRequest(intercept) {
  expect(intercept.request.method).to.equal("POST");
  expect(intercept.request.headers).to.include({
    "content-type": "application/x-www-form-urlencoded",
  });
  expect(intercept.request.body).to.contain("form-name=contact");
}

describe("Form Test", () => {
  beforeEach(() => {
    // visit uses baseUrl from cypress.json and can be overwritten e.g. by setting CYPRESS_BASE_URL env
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.spy(win.console, "log").as("consoleLog");
      },
    });
  });

  // Does only work on remote URL with a registered netlify form
  it("should successfully submit the contact form to netlify", () => {
    cy.intercept("POST", "/").as("postForm");

    fillWithValidData();

    cy.get("[data-cy=submit]").click();

    cy.wait("@postForm")
      .then((intercept) => {
        assertCorrectRequest(intercept);
      })
      .then(() => {
        var expected = {
          firstName: "Simpel",
          lastName: "Web",
          category: "A",
        };

        cy.get("@consoleLog").should(
          "be.calledWith",
          "Message successfully sent."
        );
      });
  });
});
