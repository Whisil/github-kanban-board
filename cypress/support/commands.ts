/// <reference types="cypress" />

Cypress.Commands.add('getInputByName', (name) => {
    return cy.get(`input[name="${name}"]`);
})

Cypress.Commands.add('getByDataTest', (attr) => {
    return cy.get(`[data-test=${attr}]`)
})
