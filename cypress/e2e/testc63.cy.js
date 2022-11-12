describe('Teste de Cadastro de item bem sucedido', () => {
    it('Retornar Cadastro realizado com sucesso!', () => {
        cy.visit('http://localhost:3000/#/itens')
        cy.wait(1000);
        cy.get("[data-testid=vue-toast-info]").type("teste")
        cy.contains("Cadastro realizado com sucesso!")
    })
})