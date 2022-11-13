describe('Teste de Cadastro de item bem sucedido', () => {
    it('Cadastro realizado com sucesso!', () => {
        cy.login('test@test.com.br', '12345678')

        cy.wait(1000)

        cy.visit('http://localhost:3000/#/itens')

        cy.wait(3000);
        cy.get("[data-testid=input-title]").type("teste12")
        cy.get("[data-testid=input-category]").select("Periférico")
        cy.get("[data-testid=input-value]").type("50")
        cy.get("[data-testid=input-brand]").type("marca teste")
        cy.get("[data-testid=input-model]").type("modelo teste") 
        cy.get("[data-testid='button-reg']").click()
        

    })
})