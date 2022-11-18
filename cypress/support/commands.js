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
    cy.visit('http://localhost:3000');
    cy.wait(1000);
    cy.get("[data-testid='login-input-email']").type(email);
    cy.get("[data-testid='login-input-password']").type(password);
    cy.contains("Acessar").click();
 })

 Cypress.Commands.add('openSidebar', () => { 
    
    cy.get(".toggleVisible").click();
 })

Cypress.Commands.add("register", (email, firstPassword, secondPassword) => {
   cy.visit("http://localhost:3000");
   cy.wait(1000);
   cy.contains("Cadastre-se").click();
   cy.get("[data-testid='login-input-email']").type(email);
   cy.get("[data-testid='login-input-password']").type(firstPassword);
   cy.get("[data-testid='register-input-password']").type(secondPassword);
   cy.contains("Cadastrar").click();
});

Cypress.Commands.add("registerColab", (nome, date, email, cep, neighborhood, city, number, complement, reference, phone, fileUpload) => {
   if(fileUpload) {
      cy.get("[data-testid='colab-name']").type(nome);
      cy.get("[data-testid='colab-date']").type(date);
      cy.get("[data-testid='colab-email']").type(email);
      cy.get("[data-testid='colab-zipcode']").type(cep);
      cy.get("[data-testid='colab-neighborhood']").type(neighborhood);
      cy.get("[data-testid='colab-street']").type(city);
      cy.get("[data-testid='colab-number']").type(number);
      cy.get("[data-testid='colab-complement']").type(complement);
      cy.get("[data-testid='colab-reference']").type(reference);
      cy.get("[data-testid='colab-phone']").type(phone);
      cy.get("[data-testid='colab-gender']")
            .focus()
            .should("include.text", "Outro")
            .select("Outro");
      cy.get("[data-testid='colab-position']")
            .focus()
            .should("include.text", "Desenvolvedor Frontend")
            .select("Desenvolvedor Frontend");
      cy.get("[data-testid='colab-upload-file']").click();
      cy.contains("Clique ou arraste o arquivo aqui para carregar")
         .click()
         .wait(3000);
      cy.get("input[type=file]").selectFile("src/data/imgTest.png", {force: true});
      cy.contains("Salvar").click();
      cy.wait(1000)
      cy.contains("Cadastrar").click();
   } else {
      cy.get("[data-testid='colab-name']").type(nome);
      cy.get("[data-testid='colab-date']").type(date);
      cy.get("[data-testid='colab-email']").type(email);
      cy.get("[data-testid='colab-zipcode']").type(cep);
      cy.get("[data-testid='colab-neighborhood']").type(neighborhood);
      cy.get("[data-testid='colab-street']").type(city);
      cy.get("[data-testid='colab-number']").type(number);
      cy.get("[data-testid='colab-complement']").type(complement);
      cy.get("[data-testid='colab-reference']").type(reference);
      cy.get("[data-testid='colab-phone']").type(phone);
      cy.get("[data-testid='colab-gender']")
            .focus()
            .should("include.text", "Outro")
            .select("Outro");
      cy.get("[data-testid='colab-position']")
            .focus()
            .should("include.text", "Desenvolvedor Frontend")
            .select("Desenvolvedor Frontend");
      cy.wait(500)
      cy.contains("Cadastrar").click();
   };
});

Cypress.Commands.add("registerItem", (title, value, brand, model, description, fileUpload) => {
   if(fileUpload) {
      cy.openSidebar();
      cy.get('a[href="#/itens"]').click();
      cy.get("[data-testid=itemView-input-title]").type(title);
      cy.get("[data-testid=itemView-input-category]").focus().select("Outros");
      cy.get("[data-testid=itemView-input-value]").type(value);
      cy.get("[data-testid=itemView-input-brand]").type(brand);
      cy.get("[data-testid=itemView-input-model]").type(model);
      cy.get("[data-testid=itemView-input-description]").type(description);
      cy.get("input[type=file]").selectFile("src/data/imgTest.png", {force: true});
      cy.get("[data-testid='button-reg']").click();
   } else {
      cy.openSidebar();
      cy.get('a[href="#/itens"]').click();
      cy.get("[data-testid=itemView-input-title]").type(title);
      cy.get("[data-testid=itemView-input-category]").focus().select("Outros");
      cy.get("[data-testid=itemView-input-value]").type(value);
      cy.get("[data-testid=itemView-input-brand]").type(brand);
      cy.get("[data-testid=itemView-input-model]").type(model);
      cy.get("[data-testid=itemView-input-description]").type(description);
      cy.get("[data-testid='button-reg']").click();
   };
});
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