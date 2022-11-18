describe("Realiza os testes de registro de itens", () => {
	let items = [];

	beforeEach(() => {
		cy.login("admin@teste.com", "12345678")

		cy.wait(1000);

        cy.request("GET", "/items").as("getItems").then((interception) => {
			items = interception.body;
		});
	});

	it("Edita um item com sucesso", () => {
		cy.contains("Headset Gamer Teste").click();
        cy.contains("button", "Editar Item").click();
        cy.wait(1000)
        cy.get("[data-testid=itemView-input-title]").clear().type("Produto Caro");
        cy.get("[data-testid=itemView-input-category]").focus().select("Outros");
        cy.get("[data-testid=itemView-input-value]").clear().type("2500.00");
        cy.get("[data-testid=itemView-input-brand]").clear().type("Made in China");
        cy.get("[data-testid=itemView-input-model]").clear().type("CH1N4INH0US3");
        cy.get("[data-testid=itemView-input-description]").clear().type("Este produto foi criado na China.");
        cy.contains("Editar").click();
	});
    
    it("Testa botão de cancelar", () => {
        cy.contains("Produto Caro").click();
        cy.contains("button", "Editar Item").click();
        cy.wait(1000)
        cy.get("[data-testid=itemView-input-title]").clear().type("Teste botão de cancelar");
        cy.get("[data-testid=itemView-input-category]").focus().select("Outros");
        cy.get("[data-testid=itemView-input-value]").clear().type("2100.00");
        cy.get("[data-testid=itemView-input-brand]").clear().type("Made in Cancel");
        cy.get("[data-testid=itemView-input-model]").clear().type("C4NC3LINH0US3");
        cy.get("[data-testid=itemView-input-description]").clear().type("Este produto foi cancelado.");
        cy.contains("Cancelar").click();
        cy.contains("Edição cancelada!")
        cy.url().should("eq", "http://localhost:3000/#/")
	});
    
    it('Cadastro realizado com sucesso! Com upload de imagem!', () => {
        cy.registerItem("Cadeira Nova", "1620.00", "AMD", "M0D3LN3W", "Descrição da melhor Cadeira.", true)
        cy.contains("Cadastro de colaborador realizado com sucesso!");
        cy.get("a[href='#/']").click();
    });

    it('Cadastro realizado com sucesso! Sem upload de imagem!', () => {
        cy.registerItem("Cadeira Nova", "1620.00", "AMD", "M0D3LN3W", "Descrição da melhor Cadeira.", false)
        cy.contains("Cadastro de colaborador realizado com sucesso!");
        cy.get("a[href='#/']").click();
    });
})