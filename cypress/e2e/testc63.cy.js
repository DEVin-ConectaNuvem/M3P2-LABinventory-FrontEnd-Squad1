describe('Teste de Cadastro de item bem sucedido', () => {
    it('Cadastro realizado com sucesso!', () => {
        cy.visit('http://localhost:3000/#/itens')
        cy.wait(1000);
        
        cy.get("[data-testid=reg-input-title]").should("not.null")
        cy.get("[data-testid=reg-input-category]").should("not.null")
        cy.get("[data-testid=reg-input-value]").should("not.null")
        cy.get("[data-testid=reg-input-brand]").should("not.null")
        cy.get("[data-testid=reg-input-model]").should("not.null") 
        
        cy.get("[data-testid=vue-toast-info]").type("teste")
    })
})