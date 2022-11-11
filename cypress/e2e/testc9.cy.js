describe('Teste de clickar no botao Esqueceu a senha', () => {
    it('Retornar Função em desenvolvimento!', () => {
        cy.visit('http://localhost:3000')
        cy.contains("Esqueceu a senha?").click()
        cy.contains("Função em desenvolvimento!")
    })
})