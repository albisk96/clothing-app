import "@testing-library/cypress/add-commands";

describe("Gaunamos ir nustatomos reikšmės į loacl Storage", () => {
  it("Atidaromas pagrindinis puslapis ir atvaizduojamos dvi kategorijos navigation bar'e", () => {
    cy.visitPage();
    cy.get("nav").find("a").should("have.length", 2);
    cy.get("nav").contains("men");
    cy.get("nav").contains("women");
  });
  it("Patenkama į vyrų skiltį ir ten atvaizduojamos trys kategorijos", () => {
    cy.get(".card-zoom").contains("men").click();
    cy.contains("men's Collection");
    cy.get("ul").find("li").should("have.length", 3);
  });
  it("Patenkama į moterų skiltį ir ten atvaizduojamos penkios kategorijos", () => {
    cy.get("nav").contains("women").click();
    cy.contains("women's Collection");
    cy.get("ul").find("li").should("have.length", 5);
  });
  it("Patenkama i subkategorijas ir ten atvaizduojamos teisingo prekės", () => {
    cy.get("li").contains("dresses").click();
    cy.get("li").should("have.length", 2);
  });
  it("Galima pridėti prekę į tam tikrą kategoriją ir prekių sąrašas iš karto atsinaujina kartu su local storage", () => {
    const newItem = {
      title: "Blue Jeans",
      price: "29.99",
    };
    cy.getInput("title").type(newItem.title);
    cy.getInput("price").type(newItem.price);
    cy.clickButton("Add Item").should(() => {
      expect(localStorage.getItem("data")).to.have.string(
        JSON.stringify(newItem)
      );
    });
    cy.get("li").should("have.length", 3);
  });
  it("Pridėjus subkategoriją atsinaujina subkategorijų sąrašas ir localStorage", () => {
    cy.get("nav").contains("men").click();
    cy.getInput("category").type("New Collection");
    cy.clickButton("Create").should(() => {
      expect(localStorage.getItem("data")).to.have.string(
        '{"name":"new collection","items":[]}'
      );
    });
  });
  it("Galima pridėti prekę naujoje subkategorijoje", () => {
    const newItem = {
      title: "New Item",
      price: "10.99",
    };
    cy.get("li").contains("new collection").click();

    cy.getInput("title").type(newItem.title);
    cy.getInput("price").type(newItem.price);
    cy.clickButton("Add Item").should(() => {
      expect(localStorage.getItem("data")).to.have.string(
        JSON.stringify(newItem)
      );
    });
    cy.get("li").should("have.length", 1);
  });
});
