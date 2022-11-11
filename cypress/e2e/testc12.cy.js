describe("Teste de Login Inválido", () => {
    it("Tem que aparecer Usuário ou senha inválidos!", () => {
        cy.login("teste@teste.com", "12345678")
        cy.contains("Usuário ou senha inválidos!")
    })
})