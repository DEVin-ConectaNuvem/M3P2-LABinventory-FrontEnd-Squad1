describe('Teste de Cadastro de item bem sucedido', () => {
    it('Testar se cadastro foi realizado com sucesso', () => {
        const filepath = 'fixtures/teste.jpeg'

        cy.login('test@test.com.br', '12345678')

        cy.wait(1000)

        cy.visit('http://localhost:3000/#/itens')

        cy.wait(1000);

        cy.get("[data-testid=item-title]").type("teste12")

        cy.get("[data-testid=item-category]").select("Periférico")

        cy.get("[data-testid=item-value]").type("50")

        cy.get("[data-testid=item-brand]").type("marca teste")

        cy.get("[data-testid=item-model]").type("modelo teste") 
        const files = []

        for (var i = 1; i <= 10; i++) {
        files.push(Cypress.Buffer.from(`Contents of file #${i}`))
        }

        cy.get('[data-testid=item-upload]').click();
        cy.get('[data-testid=item-upload]').selectFile('cypress/fixtures/teste.jpeg', {action: 'drag-drop'})

        cy.get("[data-testid='button-reg']").click()
        cy.contains("Cadastro realizado com sucesso!")
    })
})