// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => { 
    cy.visit('http://localhost:3000')
    cy.wait(1000);
    cy.get("[data-testid='login-input-email']").type(email)
    cy.get("[data-testid='login-input-password']").type(password)
    cy.contains("Acessar").click();
 })

 Cypress.Commands.add('openSidebar', () => { 
    
    cy.get(".toggleVisible").click()
 })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })