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



        
        // cy.get("[data-testid=item-model]").clear().blur();
        // cy.contains("div", "O campo é obrigatório");
        // cy.get("[data-testid=item-model]").type("modelo né pae");
        

        // cy.get("[data-testid=item-brand]").clear().blur();
        // cy.contains("div", "O campo é obrigatório");
        // cy.get("[data-testid=item-brand]").type("Nova marca");

        // cy.get("[data-testid=item-value]").clear().blur();
        // cy.contains("div", "O número deve igual ou maior que zero");
        // cy.get("[data-testid=item-value]").type("2500");

        // cy.get('select').select("Cadeira");
        
        // cy.contains("button", "Editar").click();

        // cy.contains("p", `${item.id} - Vamooo`).click();

        // if (item.collaborator) {
        //     cy.contains(item.collaborator);
        // } else {
        //     cy.contains("Disponível");
        // }

        // cy.contains("p", "modelo né pae");
        // cy.contains("p", `${item.id} - Vamooo`);
        // cy.contains("p", "Nova marca");
        // cy.contains("p", "2500");
        // cy.contains("p", "Cadeira");
	})
})
