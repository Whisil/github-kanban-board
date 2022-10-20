/// <reference types="cypress" />

describe("Main user actions test", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("Has preview", () => {
    cy.get("[data-icon='github']").children("path");
    cy.getByDataTest("preview-phrase").contains("Go ahead, load something");
  });

  it("Checking button enabling", () => {
    cy.getInputByName("form-input").type("github.com");

    cy.get('button[name="form-btn"]').should("be.enabled");
  });

  it("Check correct loading", () => {
    cy.getInputByName("form-input")
      .type("github.com/facebook/react")
      .then(() => {
        cy.get('button[name="form-btn"]').click();
        cy.getByDataTest("spinner");

        cy.getByDataTest("repo-owner").contains("facebook");
        cy.getByDataTest("repo-name").contains("react");

        cy.getByDataTest("spinner").should("not.exist");

        cy.getByDataTest("column").should("have.length", 3);
      });
  });

  it("Drag and drop test", () => {
    cy.getInputByName("form-input")
      .clear()
      .type("github.com/whisil/calendar")
      .then(() => {
        cy.get('button[name="form-btn"]').click();

        cy.get("[data-rfd-droppable-id='To-Do-Column']").as("first-list");
        cy.get("[data-rfd-droppable-id='In-Progress-Column']").as(
          "second-list"
        );

        cy.get("@first-list")
          .find("[data-rfd-draggable-id='1']")
          .focus()
          .trigger("keydown", { keyCode: 32 })
          .trigger("keydown", { keyCode: 39, force: true })
          .wait(1000)
          .trigger("keydown", { keyCode: 32, force: true });
      });
  });

  it("Check wrong loading", () => {
    cy.getInputByName("form-input")
      .type("github.com/faceboo/rect")
      .then(() => {
        cy.get('button[name="form-btn"]').click();
        cy.getByDataTest("spinner");

        cy.get(".ant-message-notice-content");

        cy.get("[data-icon='github']").children("path");
        cy.getByDataTest("preview-phrase").contains("Go ahead, load something");
      });
  });
});
