describe('Verifica se é possível emprestar um item', () => {
  let collaborators = []
  let collab = {}
  beforeEach(() => {
    cy.login('admin@teste.com', '12345678')
    cy.wait(1000)
    cy.openSidebar()
    cy.contains('Listar').click()
    cy.request('GET', '/employees?limit=5&page=1')
      .as('getCollaborators')
      .then((interception) => {
        collaborators = interception.body
      })
  })

  it('Verifica se há retorno de mensagem no caso de termos de pesquisa não encontrado', () => {
    cy.get('[data-testid="colab-list-inputSearch"]').type('NOT FOUND')

    cy.get('[data-testid="colab-list-not-found"]').should(
      'include.text',
      'Não há colaboradores cadastrados com este termo de pesquisa'
    )
    cy.get('[data-testid="colab-list-router-link-new"]').click()
    cy.contains('Criação e edição de colaboradores').should('be.visible')
  })

  it('Os dados são exibidos corretamente na tela', () => {
    collab = collaborators[0]

    cy.contains('Lista de colaboradores').should('be.visible')
    cy.get('.accordion-button').should('have.length', 5)
    cy.get('.accordion-button').eq(0).click()
    cy.get(`[data-testid="colab-list-name-${collab.id}"]`).should('have.text', collab.name)
    cy.get(`[data-testid="colab-list-position-${collab.id}"]`).should('have.text', collab.position)
    cy.get(`[data-testid="colab-list-email-${collab.id}"]`).should('have.text', collab.email)
    cy.get(`[data-testid="colab-list-phone-${collab.id}"]`).should('have.text', collab.phone)
    cy.get(`[data-testid="colab-list-createdAt-${collab.id}"]`).should('have.text', collab.createdAt)
  })

  it('Verifica se há imagem de colaborador', () => {
    collab = collaborators[0]
    cy.get(`[data-testid="colab-list-imageUser-${collab.id}"]`).should('have.attr', 'src', collab.imageUser)
  })

  it('Verifica alterações do titulo das páginas de edição/criação na navegação do usuario', () => {
    collab = collaborators[0]
    cy.get('.accordion-button').eq(0).click()
    cy.get('[data-testid="colab-list-buttonEdit"]').eq(0).click()
    cy.contains('Criação e edição de colaboradores').should('be.visible')
  })

  it('Verifica toast de edição de colaborador com sucesso', () => {
    collab = collaborators[0]
    cy.get('.accordion-button').eq(0).click()
    cy.get('[data-testid="colab-list-buttonEdit"]').eq(0).click()
    cy.get(`[data-testid="colab-reference"]`).type('teste')
    cy.get("[data-testid='colab-submit-button']").click()
    cy.contains('Colaborador editado com sucesso')
  })

  it('Verifica cancelamento da edição de colaborador', () => {
    collab = collaborators[0]
    cy.get('.accordion-button').eq(0).click()
    cy.get('[data-testid="colab-list-buttonEdit"]').eq(0).click()
    cy.get(`[data-testid="colab-reference"]`).type('teste')
    cy.get("[data-testid='colab-reset-button']").click()
    cy.contains('Edição cancelada')
  })
})
