describe("Testes da Tela de Login, LoginView.vue", () => {
    it("Tem que aparecer o alt da imagem", () => {
        cy.visit("http://localhost:3000")
        cy.get("[alt=logo]")
        cy.get("[alt=wallpaper-login-image]")
    })

    it('Ainda não há itens cadastrados com este termo de pesquisa - Realizar novo cadastro', () => {
        cy.login("teste@teste.com.br", "12345678")
        cy.get("[data-testid=search-input-item]").type("teste999999999")
        cy.contains("p", "Ainda não há itens cadastrados com este termo de pesquisa - Realizar novo cadastro")
    })

    it("Tem que aparecer Usuário ou senha inválidos!", () => {
        cy.login("teste@teste.com", "12345678111111111")
        cy.contains("Usuário ou senha inválidos!")
    })

    it("Deve contar mensagem de criação realizada com sucesso", () => {
        cy.visit('http://localhost:3000')
        const random_str = Math.random().toString(36).substring(7)
        cy.register(`testcard11${random_str}@gmail.com.br`, '12345678', '12345678')
        cy.wait(1000)
        cy.contains("Usuário cadastrado com sucesso!")
    })

    it('Tem que levar pra url ', () => {
        cy.visit('http://localhost:3000')
        cy.contains("Cadastre-se").click()
        cy.url("http://localhost:3000/#/login")
        cy.get("[data-testid=register-input-password]")
    })

    it('Retornar Função em desenvolvimento!', () => {
        cy.visit('http://localhost:3000')
        cy.contains("Esqueceu a senha?").click()
        cy.contains("Função em desenvolvimento!")
        cy.get("[data-testid=login-google-button]").click()
        cy.contains("Função em desenvolvimento!")
    })

    it('Retornar A senha deve ter no mínimo 8 caracteres, Um e-mail válido deve ser informado', () => {
      cy.login('teste.com.br', '123456')
      cy.contains('Um e-mail válido deve ser informado')
      cy.contains('A senha deve ter no mínimo 8 caracteres')
    })
  
    it("Login realizado com sucesso!", () => {
        cy.login("teste@teste.com.br", "12345678")
        cy.wait(1000)
        cy.contains("Login realizado com sucesso!")
    })

})