describe("Realiza os testes de registro de colaborador", () => {
  let cep = [];
  beforeEach(() => {
    cy.login("admin@teste.com", "12345678");
    cy.wait(1000);
    cy.openSidebar();
    cy.get('a[href="#/colaboradores"]').click();
  });

  it("Complemento vazio, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {
    cy.get("[data-testid=colab-complement]").clear().blur();
    cy.contains("div", "O campo é obrigatório");
  });

  it("Referência vazia, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {
    cy.get("[data-testid=colab-reference]").clear().blur();
    cy.contains("div", "O campo é obrigatório");
  });

  it("Cargo vazio, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {
    cy.get("[data-testid=colab-position]").focus().blur();
    cy.contains("div", "O campo é obrigatório");
  });

  it("Cargo vazio, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {
    cy.get("[data-testid=colab-position]").focus().blur();
    cy.contains("div", "O campo é obrigatório");
  });

  it("CEP vazio, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {
    cy.get("[data-testid=colab-zipcode]").clear().blur();
    cy.contains("div", "O CEP é obrigatório");
    cy.get("[data-testid=colab-city]");
    cy.contains("div", "O campo é obrigatório");
    cy.get("[data-testid=colab-state]");
    cy.contains("div", "O campo é obrigatório");
  });

  it("Bairro vazio, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {
    cy.get("[data-testid=colab-neighborhood]").clear().blur();
    cy.contains("div", "O campo é obrigatório");
  });

  it("Rua vazia, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {
    cy.get("[data-testid=colab-street]").clear().blur();
    cy.contains("div", "O campo é obrigatório");
  });

  it("Número vazio, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {
    cy.get("[data-testid=colab-number]").clear().blur();
    cy.contains("div", "O número deve igual ou maior que zero");
  });

  it("CEP deve conter 8 dígitos'", () => {
    cy.get("[data-testid=colab-zipcode]").type("1234567").blur();
    cy.contains("O CEP deve ter 8 dígitos");
  });

  it("CEP não encontrado", () => {
    cy.get("[data-testid=colab-zipcode]").type("12345678").blur();
    cy.contains("CEP não encontrado");
    cy.request("GET", "https://viacep.com.br/ws/12345678/json/")
      .as("getCEP")
      .then((interception) => {
        expect(interception.body.erro).to.be.true;
      });
  });

  it("Gênero vazio, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {
    cy.get("[data-testid=colab-gender]").focus().blur();
    cy.contains("O campo é obrigatório");
  });

  it("Telefone vazio, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {
    cy.get("[data-testid=colab-phone]").clear().blur();
    cy.contains("O telefone é obrigatório");
  });

  it("Telefone deve conter 10 dígitos'", () => {
    cy.get("[data-testid=colab-phone]").type("1234567").blur();
    cy.contains("O telefone deve ter 10 dígitos");
  });

  it("Nascimento vazio, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {
    cy.get("[data-testid=colab-date]").focus().blur();
    cy.contains("A data é obrigatória");
  });

  it("Data deve ser anterior à atual", () => {
    cy.get("[data-testid=colab-date]").type("2200-01-01").blur();
    cy.contains("A data não pode ser superior a data atual");
  });

  it("Email vazio, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {
    cy.get("[data-testid=colab-email]").focus().blur();
    cy.contains("O e-mail é obrigatório");
  });

  it("Email deve ser válido", () => {
    cy.get("[data-testid=colab-email]").type("abc.com.br").blur();
    cy.contains("Um e-mail válido deve ser informado");
  });

  it("Nome vazio, ao perder o foco deve retornar mensagem 'campo obrigatório'", () => {
    cy.get("[data-testid=colab-name]").clear().blur();
    cy.contains("O nome é obrigatório");
  });

  it("Nome deve conter 3 caracteres'", () => {
    cy.get("[data-testid=colab-name]").type("Zé").blur();
    cy.contains("O nome deve ter no mínimo 3 caracteres");
  });

  it("Teste de criação de Colaborador com sucesso! Sem Upload de Foto", () => {
    cy.registerColab("Teste", "1998-01-01", "testeeee@teste.com.br", "59140023", "Teste bairro", "Teste Cidade", "123", "Teste Complem", "Teste Ref", "1234567890", false);
    cy.get("[data-testid='colab-submit-button']").click();
    cy.contains("Cadastro de colaborador realizado com sucesso!");
  });

  it("Teste de criação de Colaborador com sucesso! Com Upload de Foto", () => {
    cy.registerColab("Teste", "1998-01-01", "testeeee@teste.com.br", "59140023", "Teste bairro", "Teste Cidade", "123", "Teste Complem", "Teste Ref", "1234567890", true);
    cy.get("[data-testid='colab-submit-button']").click();
    cy.contains("Cadastro de colaborador realizado com sucesso!");
  });
});
