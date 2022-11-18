describe('Verificar se as categorias de pesquisa estão disponiveis no dropdown ao lado do input de pesquisa.',()=>{
    it('Teste de categoria de pesquisa de lista de contribuintes',()=>{
        cy.login('test@test.com.br', '12345678')

        cy.wait(1000)

        cy.visit('http://localhost:3000/#/lista-colaboradores')

        cy.wait(1500);

        cy.get("select").select('Nome')
        cy.get("select").select('Cargo')
        cy.get("select").select('E-mail')
    })
})