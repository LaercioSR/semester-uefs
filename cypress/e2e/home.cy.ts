const BASE_URL = "http://localhost:3000";

describe("/ - Home", () => {
  it("when load, renders the page", () => {
    cy.visit(BASE_URL);
  });
});
