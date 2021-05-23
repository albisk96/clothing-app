import "@testing-library/cypress/add-commands";

describe("Formų validacija", () => {
  it("Kuriant naują kategoriją, negalima įvesti ilgesnio pavadinimo nei 15 simbolių", () => {
    const tooLongString = "abcd abcd abcd ab";
    cy.visitPage();
    cy.get(".card-zoom").contains("men").click();
    cy.getInput("category").type(tooLongString);
    cy.clickButton("Create").click();
    cy.get("form").contains("Name is too long");
  });
  it("Negalima sukurti subkategorijos dublikacijos", () => {
    const duplicateName = "Duplicate";
    cy.clearInputValue("category").type(duplicateName);
    cy.clickButton("Create").click();
    cy.clickButton("Create").click();
    cy.get("form").contains("This collection already exists");
  });
  it("Negalima sukurti subkategorijos su tuščiu pavadinimu", () => {
    cy.clearInputValue("category");
    cy.clickButton("Create").click();
    cy.get("form").contains("Collection's name cannot be empty");
  });
  it("Negalima kurti prekės su tuščiomis reikšmėmis", () => {
    cy.get("li").contains("jackets").click();
    cy.clickButton("Add Item").click();
    cy.get("form").contains("Title cannot be empty");
    cy.get("form").contains("Price cannot be empty");
  });
  it("Prekės kaina negali būti didesnė nei 10 000", () => {
    cy.getInput("price").type("10001");
    cy.clickButton("Add Item").click();
    cy.get("form").contains("Incorrect price");
  });
  it("Prekės kaina negali būti mažesnė už 0.5", () => {
    cy.clearInputValue("price").type("-1");
    cy.clickButton("Add Item").click();
    cy.get("form").contains("Incorrect price");
  });
  it("Prekės pavadinimas negali būti ilgesnis nei 25 simboliai", () => {
    cy.clearInputValue("title").type("abcd abcd abcd abcd abcd abcd abcd");
    cy.clickButton("Add Item").click();
    cy.get("form").contains("Title is too long");
  });
});
