describe("Realiza os testes de registro de colaborador", () => {
  let cep = [];
  beforeEach(() => {
    cy.login("admin@teste.com", "12345678");
    cy.wait(1000);
    cy.openSidebar();
    cy.get('a[href="#/colaboradores"]').click();
  });

  // it("Complemento vazio, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {
  //   cy.get("[data-testid=colab-complement]").clear().blur();
  //   cy.contains("div", "O campo é obrigatório");
  //   cy.get("[data-testid=colab-reference]").clear().blur();
  //   cy.contains("div", "O campo é obrigatório");
  //   cy.get("[data-testid=colab-position]").focus().blur();
  //   cy.contains("div", "O campo é obrigatório");
  //   cy.get("[data-testid=colab-position]").focus().blur();
  //   cy.contains("div", "O campo é obrigatório");
  //   cy.get("[data-testid=colab-zipcode]").clear().blur();
  //   cy.contains("div", "O CEP é obrigatório");
  //   cy.get("[data-testid=colab-city]");
  //   cy.contains("div", "O campo é obrigatório");
  //   cy.get("[data-testid=colab-state]");
  //   cy.contains("div", "O campo é obrigatório");
  //   cy.get("[data-testid=colab-neighborhood]").clear().blur();
  //   cy.contains("div", "O campo é obrigatório");
  //   cy.get("[data-testid=colab-street]").clear().blur();
  //   cy.contains("div", "O campo é obrigatório");
  //   cy.get("[data-testid=colab-number]").clear().blur();
  //   cy.contains("div", "O número deve ser igual ou maior que zero");
  //   cy.get("[data-testid=colab-zipcode]").type("1234567").blur();
  //   cy.contains("O CEP deve ter 8 dígitos");
  //   cy.get("[data-testid=colab-zipcode]").type("12345678").blur();
  //   cy.contains("CEP não encontrado");
  //   cy.request("GET", "https://viacep.com.br/ws/12345678/json/")
  //     .as("getCEP")
  //     .then((interception) => {
  //       expect(interception.body.erro).to.be.true;
  //     });
  //   cy.get("[data-testid=colab-gender]").focus().blur();
  //   cy.contains("O campo é obrigatório");
  //   cy.get("[data-testid=colab-phone]").clear().blur();
  //   cy.contains("O telefone é obrigatório");
  //   cy.get("[data-testid=colab-phone]").type("1234567").blur();
  //   cy.contains("O telefone deve ter no mínimo 9 dígitos");
  //   cy.get("[data-testid=colab-date]").focus().blur();
  //   cy.contains("A data é obrigatória");
  //   cy.get("[data-testid=colab-date]").type("2200-01-01").blur();
  //   cy.contains("A data não pode ser superior a data atual");
  //   cy.get("[data-testid=colab-email]").focus().blur();
  //   cy.contains("O e-mail é obrigatório");

  //   cy.get("[data-testid=colab-email]").type("abc.com.br").blur();
  //   cy.contains("Um e-mail válido deve ser informado");
  //   cy.get("[data-testid=colab-name]").clear().blur();
  //   cy.contains("O nome é obrigatório");
  //   cy.get("[data-testid=colab-name]").type("Zé").blur();
  //   cy.contains("O nome deve ter no mínimo 3 caracteres");
  // });

  // it("Teste de criação de Colaborador com sucesso! Sem Upload de Foto", () => {
  //   cy.registerColab("Teste", "1998-01-01", "testeeee@teste.com.br", "59140023", "Teste bairro", "Teste Cidade", "123", "Teste Complem", "Teste Ref", "1234567890", false);
  //   cy.get("[data-testid='colab-submit-button']").click();
  //   cy.contains("Cadastro de colaborador realizado com sucesso!");
  // });

  it("Teste de criação de Colaborador com sucesso! Com Upload de Foto", () => {
    const randomStr = Math.random().toString(36).substring(0, 4)
    const email = `teste${randomStr}@teste.com.br`

    cy.registerColab(
      'Teste',
      '1998-01-01',
      email,
      '59140023',
      'Teste bairro',
      'Teste Cidade',
      '123',
      'Teste Complem',
      'Teste Ref',
      '1234567890',
      true
    )
    cy.get("[data-testid='colab-submit-button']").click();
    cy.contains("Cadastro de colaborador realizado com sucesso!");
  });
});
