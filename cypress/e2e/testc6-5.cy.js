describe("Teste de Email inválido e Senha inválida", () => {
    it("Retornar A senha deve ter no mínimo 8 caracteres, Um e-mail válido deve ser informado", () => {
        cy.login("teste.com.br", "123456")
        cy.contains("Um e-mail válido deve ser informado")
        cy.contains("A senha deve ter no mínimo 8 caracteres")
    })
})