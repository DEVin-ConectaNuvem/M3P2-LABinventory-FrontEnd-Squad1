describe('Dashboard', () => {
    it('Visita a pagina dashboard, procura um item e valida a mensagem de nenhum item encontrado e a rota para cadastrar novo item.', () => {
        cy.visit('http://localhost:3000');

        cy.wait(1000)
        
        cy.get('input[placeholder="Digite o e-mail"]').type("teste@teste.com.br");
        cy.get('input[placeholder="Digite sua senha"]').type("12345678");

        cy.get('button:contains("Acessar")').first().click();

        cy.wait(3000)

        cy.get('input[placeholder*="Buscar item..."]').type("99999999999999999");

        cy.wait(1000)

        cy.contains("Ainda não há itens cadastrados com este termo de pesquisa");

        cy.get('a:contains("Realizar novo cadastro")').first().click();

        cy.wait(1000)
        
        cy.contains("Criação e edição de itens");

    }),
    it('Visita a pagina dashboard e valida se os cards com informações totais de colaboradores está sendo exibida e ao clicar no card, abre um modal que nós redireciona para listagem de colaboradores', () => {
        cy.visit('http://localhost:3000');

        cy.wait(1000)
        
        cy.get('input[placeholder="Digite o e-mail"]').type("teste@teste.com.br");
        cy.get('input[placeholder="Digite sua senha"]').type("12345678");

        cy.get('button:contains("Acessar")').first().click();

        cy.wait(3000);

        cy.get('h4[class="my-1"]');

        cy.get('p:contains("Colaboradores")').click();

        cy.contains("Gostaria de ver mais informações sobre colaboradores ?")

        cy.get('button:contains("Verificar!")').click();

        cy.contains("Listagem de colaboradores")

    }),
    it('Visita a pagina dashboard e valida se os cards com informações totais de itens, valores e empréstimos está sendo exibida e ao clicar no card, abre um modal que nós redireciona para listagem de itens', () => {
        cy.visit('http://localhost:3000');

        cy.wait(1000)
        
        cy.get('input[placeholder="Digite o e-mail"]').type("teste@teste.com.br");
        cy.get('input[placeholder="Digite sua senha"]').type("12345678");

        cy.get('button:contains("Acessar")').first().click();

        cy.wait(3000);

        cy.get('h4[class="my-1"]');

        cy.get('p:contains("Itens")').click();
        cy.contains("Gostaria de ver mais informações sobre itens ?");
        cy.get('button:contains("Verificar!")').click();
        cy.contains("Listagem de itens");

        cy.get('i[class="fa-solid fa-bars fs-2 text-white"]').click();
        cy.get('span:contains("Inventário")').click();

        cy.get('p:contains("Valores")').click();
        cy.contains("Gostaria de ver mais informações sobre itens ?");
        cy.get('button:contains("Verificar!")').click();
        cy.contains("Listagem de itens");
        
        cy.get('span:contains("Inventário")').click();

        cy.get('p:contains("Empréstimos")').click();
        cy.contains("Gostaria de ver mais informações sobre empréstimos ?");
        cy.get('button:contains("Verificar!")').click();
        cy.contains("Listagem de itens");

        cy.get('span:contains("Inventário")').click();

        cy.contains("Dashboard");
    })
  })