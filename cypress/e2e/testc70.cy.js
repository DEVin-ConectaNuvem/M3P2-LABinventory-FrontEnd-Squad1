describe('Teste de Listagem - Pesquisa não encontrada.', () => {
    it('Ainda não há itens cadastrados com este termo de pesquisa - Realizar novo cadastro', () => {
        cy.visit('http://localhost:3000/#/login')
        cy.get("[data-testid=login-input-email]").type("teste@teste.com.br")
        cy.get("[data-testid=login-input-password]").type("12345678")
        cy.contains("Acessar").click()
        cy.get("[data-testid=search-input-item]").type("teste")
        cy.contains("p", "Ainda não há itens cadastrados com este termo de pesquisa - Realizar novo cadastro")
    })
})