describe("Teste de número maior ou igual a zero", ()=>{
    it("Testa se o número é igual ou maior que zero", ()=>{
        cy.login('test@test.com.br', '12345678')
        
        cy.wait(3000)

        cy.visit('http://localhost:3000/#/colaboradores')

        cy.wait(1000)

        cy.get("[data-testid=input-number]").click();
        cy.focused().blur();
        cy.get("[data-testid=vue-toast-info]")
        cy.contains('O número deve ser igual ou maior que zero')
    })
})