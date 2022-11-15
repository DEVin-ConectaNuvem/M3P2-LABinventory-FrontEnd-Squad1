describe('Navbar e Sidebar', () => {

    beforeEach(() => {
		cy.login("admin@teste.com", "12345678")

		cy.wait(3000);
		});
    it('Verifica se a Navbar está visivel, mostrando o título da tela e o icone de avatar', () => {

        cy.get('header[class="p-3"]').should('be.visible')

        cy.get('[class="text-white text-center namePage"]')

        cy.get('img[class="avatar"]').should('be.visible', 'have.attr', 'src')
    }),
    it('Verifica se o Sidebar está abrindo e também se o logout e as rotas das páginas estão funcionando', () => {

        cy.openSidebar();

        cy.get('a[href="#/colaboradores"]').click();
        cy.wait(1000);
        cy.url().should('include', '/colaboradores');
        cy.contains('Criação e edição de colaboradores').should('be.visible');

        cy.get('a[href="#/lista-colaboradores"]').click();
        cy.wait(1000);
        cy.url().should('include', '/lista-colaboradores');
        cy.contains('Listagem de colaboradores').should('be.visible');

        cy.get('a[href="#/itens"]').click();
        cy.wait(1000);
        cy.url().should('include', '/itens');
        cy.contains('Criação e edição de itens').should('be.visible');

        cy.get('a[href="#/lista-itens"]').click();
        cy.wait(1000);
        cy.url().should('include', '/lista-itens');
        cy.contains('Listagem de itens').should('be.visible');

        cy.get('a[href="#/"]').click();
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:3000/#/');
        cy.contains('Dashboard').should('be.visible');

        cy.get('#dropdownUser1').click();
        cy.get('a:contains("Sair")').click();
        cy.url().should('include', '/login');

    })
})