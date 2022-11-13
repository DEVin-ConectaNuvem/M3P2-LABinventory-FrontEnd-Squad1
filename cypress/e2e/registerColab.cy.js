describe("Realiza os testes de registro de colaborador", () => {

	beforeEach(() => {
		cy.login("admin@teste.com", "12345678")
		cy.wait(1000);
        cy.openSidebar();
        cy.get('a[href="#/colaboradores"]').click();
	})

	it("Complemento vazio, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {

        cy.get("[data-testid=colab-complement]").clear().blur();
        cy.contains("div", "O campo é obrigatório");
        cy.reload();

        cy.get("[data-testid=colab-reference]").clear().blur();
        cy.contains("div", "O campo é obrigatório");
        cy.reload();

        cy.get("[data-testid=colab-position]").focus().blur();
        cy.contains("div", "O campo é obrigatório");
        cy.reload();

        cy.get("[data-testid=colab-zipcode]").clear().blur();
        cy.contains("div", "O CEP é obrigatório");


        cy.get("[data-testid=colab-city]");
        cy.contains("div", "O campo é obrigatório");

        cy.get("[data-testid=colab-state]");
        cy.contains("div", "O campo é obrigatório");

        cy.get("[data-testid=colab-neighborhood]").clear().blur();
        cy.contains("div", "O campo é obrigatório");
        
        cy.get("[data-testid=colab-street]").clear().blur();
        cy.contains("div", "O campo é obrigatório");
        cy.reload();

        cy.get("[data-testid=colab-number]").clear().blur();
        cy.contains("div", "O número deve igual ou maior que zero");
        cy.reload();

        cy.get("[data-testid=colab-complement]").clear().blur();
        cy.contains("div", "O campo é obrigatório");
        
        cy.get("[data-testid=colab-reference]").clear().blur();
        cy.contains("div", "O campo é obrigatório");
	
        });
});