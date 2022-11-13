describe('Teste do Botão Limpar no cadastro de Contribuinte',()=>{
    it('Testar se o botão "limpar" está realmente limpando todos os campos', ()=>{
        cy.login('test@test.com.br', '12345678');
        cy.wait(3000);
        cy.visit('http://localhost:3000/#/colaboradores');
        cy.wait(1000);
        cy.get("[data-testid=colab-name]").type("teste12");
        cy.get("[data-testid=colab-gender]").select("Masculino");
        cy.get("[data-testid=colab-date]").type("1990-04-04");
        cy.get("[data-testid=colab-phone]").type("(61) 99999-9999");
        cy.get("[data-testid=colab-email]").type("teste@teste.com");
        cy.get("[data-testid=colab-position]").select("Desenvolvedor Backend");
        cy.get("[data-testid=colab-zipcode]").type("72130007").trigger('keydown', {
            key: 'Enter',
          });
        cy.get("[data-testid=colab-neighborhood]").type("testestesteste");
        cy.get("[data-testid=colab-street]").type("teste teste tststststs");
        cy.get("[data-testid=colab-number]").type("5");
        cy.get("[data-testid=colab-complement]").type("abcde");
        cy.get("[data-testid=colab-reference]").type("fghij");
        
        cy.get("[data-testid=reset-button]").click();

        cy.get("[data-testid=colab-name]").should('be.empty');

        cy.get("[data-testid='colab-position']")
            .focus()
            .should("include.text", "Escolha o cargo")

        cy.get("[data-testid='colab-gender']")
            .focus()
            .should("include.text", "Escolha o gênero")
        cy.get("[data-testid=colab-date]").should('be.empty');
        cy.get("[data-testid=colab-phone]").should('be.empty');
        cy.get("[data-testid=colab-email]").should('be.empty');
        cy.get("[data-testid=colab-zipcode]").should('be.empty');
        cy.get("[data-testid=colab-neighborhood]").should('be.empty');
        cy.get("[data-testid=colab-street]").should('be.empty');
        cy.get("[data-testid=colab-number]").should('be.empty');
        cy.get("[data-testid=colab-complement]").should('be.empty');
        cy.get("[data-testid=colab-reference]").should('be.empty');
    })
})