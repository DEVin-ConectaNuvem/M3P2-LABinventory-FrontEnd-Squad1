describe('Dashboard', () => {
    beforeEach(() => {
		cy.login("admin@teste.com", "12345678")

		cy.wait(3000);
	}),
    it('Visita a pagina dashboard, procura um item e valida a mensagem de nenhum item encontrado e a rota para cadastrar novo item.', () => {

        cy.get('input[placeholder*="Buscar item..."]').type("!#@#");

        cy.wait(1000)

        cy.contains("Ainda não há itens cadastrados com este termo de pesquisa");

        cy.get('a:contains("Realizar novo cadastro")').first().click();

        cy.wait(1000)
        
        cy.contains("Criação e edição de itens");

    }),
    it('Visita a pagina dashboard e valida se os cards com informações totais de colaboradores está sendo exibida e ao clicar no card, abre um modal que nós redireciona para listagem de colaboradores', () => {

        cy.get('h4[class="my-1"]');

        cy.get('p:contains("Colaboradores")').click();

        cy.contains("Gostaria de ver mais informações sobre colaboradores ?")

        cy.get('button:contains("Verificar!")').click();

        cy.contains("Listagem de colaboradores")

    }),
    it('Visita a pagina dashboard e valida se os cards com informações totais de itens, valores e empréstimos está sendo exibida e ao clicar no card, abre um modal que nós redireciona para listagem de itens', () => {

        cy.get('h4[class="my-1"]');

        cy.get('p:contains("Itens")').click();
        cy.contains("Gostaria de ver mais informações sobre itens ?");
        cy.get('button:contains("Verificar!")').click();
        cy.contains("Listagem de itens");

        cy.openSidebar();
        cy.get('span:contains("Inventário")').click();

        cy.get('p:contains("Valores")').click();
        cy.contains("Gostaria de ver mais informações sobre itens ?");
        cy.get('button:contains("Verificar!")').click();
        cy.contains("Listagem de itens");
        
        cy.get('span:contains("Inventário")').click();

        cy.get('p:contains("Empréstimos")').click();
        cy.contains("Gostaria de ver mais informações sobre itens ?");
        cy.get('button:contains("Verificar!")').click();
        cy.contains("Listagem de itens");

        cy.get('span:contains("Inventário")').click();

        cy.contains("Dashboard");
    })
  })