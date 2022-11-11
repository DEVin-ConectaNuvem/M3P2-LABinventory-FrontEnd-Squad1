describe("Teste de Login bem sucedido", () => {
    
    beforeEach(() => {
        cy.login("teste@teste.com.br", "12345678")
        cy.wait(1000)
    })
    
    it("Login realizado com sucesso!", () => {
        cy.contains("Login realizado com sucesso!")
    })
})