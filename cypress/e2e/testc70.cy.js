describe('Teste de Listagem - Pesquisa não encontrada.', () => {
    it('Ainda não há itens cadastrados com este termo de pesquisa - Realizar novo cadastro', () => {
        cy.login("teste@teste.com.br", "12345678")
        cy.get("[data-testid=search-input-item]").type("teste")
        cy.contains("p", "Ainda não há itens cadastrados com este termo de pesquisa - Realizar novo cadastro")
    })
})