describe('Teste de Cadastro', () => {
    it('Tem que levar pra url ', () => {
        cy.visit('http://localhost:3000')
        cy.contains("Cadastre-se").click()
        cy.url("http://localhost:3000/#/login")
        cy.get("[data-testid=register-input-password]")
    })
})