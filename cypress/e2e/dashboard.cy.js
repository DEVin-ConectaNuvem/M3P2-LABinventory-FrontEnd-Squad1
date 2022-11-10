describe('Dashboard', () => {
    it('Visita a pagina dashboard, procura um item e valida a mensagem de nenhum item encontrado e a rota para cadastrar novo item.', () => {
        cy.visit('http://localhost:3000');

        cy.wait(1000)
        
        cy.get('input[placeholder="Digite o e-mail"]').type("edumartinsrib@live.com");
        cy.get('input[placeholder="Digite sua senha"]').type("12345678");

        cy.get('button:contains("Acessar")').first().click();

        cy.wait(3000)

        cy.get('input[placeholder*="Buscar item..."]').type("99999999999999999");

        cy.contains("Ainda não há itens cadastrados com este termo de pesquisa");

        cy.get('a').contains('Realizar novo cadastro').click();

        cy.wait(1000)
        
        cy.contains("Criação e edição de itens");

    })
  })