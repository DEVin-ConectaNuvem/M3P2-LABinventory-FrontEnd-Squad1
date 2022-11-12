import { selectARandomItem } from '../helpers/services/utils';

describe("Verifica se é possível editar um item", () => {
	let items = [];

	beforeEach(() => {
		cy.login("admin@teste.com", "12345678")

		cy.wait(1000);

        cy.request("GET", "/items").as("getItems").then((interception) => {
			items = interception.body;
		});
	})

	it("Edita um item com sucesso", () => {
		const item  = selectARandomItem(items);

		cy.contains(item.title).click();

        cy.contains(item.title);

        if (item.collaborator) {
            cy.contains(item.collaborator);
        } else {
            cy.contains("Disponível");
        }

        cy.contains("p", item.brand);
        cy.contains("p", item.model);
        cy.contains("p", item.value);
        cy.contains("p", item.category);

        cy.contains("button", "Editar Item").click();

        cy.wait(1000)

        cy.get("[data-testid=item-title]").clear().blur();
        cy.contains("div", "O campo é obrigatório");
        cy.get("[data-testid=item-title]").type("Vamooo");

        cy.get("[data-testid=item-model]").clear().blur();
        cy.contains("div", "O campo é obrigatório");
        cy.get("[data-testid=item-model]").type("modelo né pae");


        cy.get("[data-testid=item-brand]").clear().blur();
        cy.contains("div", "O campo é obrigatório");
        cy.get("[data-testid=item-brand]").type("Nova marca");

        cy.get("[data-testid=item-value]").clear().blur();
        cy.contains("div", "O número deve igual ou maior que zero");
        cy.get("[data-testid=item-value]").type("2500");

        cy.get('select').select("Cadeira");
        
        cy.contains("button", "Editar").click();

        cy.contains("p", `${item.id} - Vamooo`).click();

        if (item.collaborator) {
            cy.contains(item.collaborator);
        } else {
            cy.contains("Disponível");
        }

        cy.contains("p", "modelo né pae");
        cy.contains("p", `${item.id} - Vamooo`);
        cy.contains("p", "Nova marca");
        cy.contains("p", "2500");
        cy.contains("p", "Cadeira");
	})
})

describe("Testa botão de cancelar", () => {
    let items = [];

	beforeEach(() => {
		cy.login("admin@teste.com", "12345678")

		cy.wait(1000);

        cy.request("GET", "/items").as("getItems").then((interception) => {
			items = interception.body;
		});
	})

    it("Testa botão de cancelar", () => {
		const item  = selectARandomItem(items);

		cy.contains(item.title).click();

        cy.contains(item.title);

        if (item.collaborator) {
            cy.contains(item.collaborator);
        } else {
            cy.contains("Disponível");
        }

        cy.contains("p", item.brand);
        cy.contains("p", item.model);
        cy.contains("p", item.value);
        cy.contains("p", item.category);

        cy.contains("button", "Editar Item").click();
 
        cy.contains("button", "Cancelar").click();

        cy.url().should("eq", "http://localhost:3000/#/")
	})
})