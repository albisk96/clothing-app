import "@testing-library/cypress/add-commands";
import data from "../fixtures/data.json";

Cypress.Commands.add("visitPage", () => {
  const dataStr = JSON.stringify(data);
  window.localStorage.setItem("data", dataStr);
  cy.visit("/");
});

Cypress.Commands.add("getInput", (name) => {
  cy.get(`input[name="${name}"]`);
});

Cypress.Commands.add("clickButton", (name) => {
  cy.findByRole("button", { name: name }).click();
});

Cypress.Commands.add("clearInputValue", (name) => {
  cy.get(`input[name="${name}"]`).type(
    "{selectall}{backspace}{backspace}{esc}"
  );
});
