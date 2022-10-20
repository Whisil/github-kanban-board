/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
        * Custom command to select DOM element by data-cy attribute.
        * @example cy.getInputByName('name')
        */
        getInputByName(name: string): Chainable<any>;
        getByDataTest(attr: string): Chainable<any>;
    }
}