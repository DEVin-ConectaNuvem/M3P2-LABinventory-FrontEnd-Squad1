describe('Teste de Cadastro bem sucedido', () => {
    it("Deve contar mensagem de criação realizada com sucesso", () => {
        cy.visit('http://localhost:3000')
        cy.register("testcard11@gmail.com.br", "12345678", "12345678")
        cy.contains("Cadastro realizado com sucesso!")
    })
})