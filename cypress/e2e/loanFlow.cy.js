import {
  selectARandomAvailableItem,
  selectARandomCollaborator,
  selectARandomBorrowedItem,
  formatDate
} from '../helpers/services/utils'

describe('Verifica se é possível emprestar um item', () => {
  let items = []
  let collaborators = []

  beforeEach(() => {
    cy.login('admin@teste.com', '12345678')

    cy.wait(1000)

    cy.openSidebar()

    cy.contains('Empréstimo').click()

    cy.request('GET', '/employees')
      .as('getCollaborators')
      .then(interception => {
        collaborators = interception.body.rows
      })

    cy.request('GET', '/inventory')
      .as('getItems')
      .then(interception => {
        items = interception.body.rows
      })
  })

  it('Os dados são exibidos corretamente na tela', () => {
    const item = selectARandomAvailableItem(items)

    cy.get(`[data-testid='item-${item.id}-title']`).should(
      'include.text',
      item.title
    )

    cy.get(`[data-testid='item-${item.id}-status']`).should(
      'include.text',
      'Item disponível'
    )

    cy.get(`[data-testid='item-${item.id}']`).click()

    cy.get(`[data-testid='item-${item.id}-description']`).should(
      'include.text',
      item.description
    )

    cy.get(`[data-testid='item-${item.id}-created-at']`).should(
      'include.text',
      formatDate(item.createdAt, 'DD/MM/YYYY hh:mm')
    )

    cy.get(`[data-testid='item-${item.id}-updated-at']`).should(
      'include.text',
      formatDate(item.updatedAt, 'DD/MM/YYYY hh:mm')
    )

    cy.get(`[data-testid='item-${item.id}-loan-at']`).should('be.empty')

    cy.get(`[data-testid='item-${item.id}-borrow-or-return-button']`).should(
      'include.text',
      'Emprestar item'
    )

    cy.get(`[data-testid='item-${item.id}-edit-button']`).should(
      'include.text',
      'Editar item'
    )
  })

  it('Empresta um item com sucesso', () => {
    const item = selectARandomAvailableItem(items)
    const collaborator = selectARandomCollaborator(collaborators)

    cy.get(`[data-testid='item-${item.id}']`)
      .should('include.text', item.title)
      .click()

    cy.get(`[data-testid='item-${item.id}-borrow-or-return-button']`)
      .should('include.text', 'Emprestar item')
      .click()

    cy.get("[data-testid='item-dialog-title']").should(
      'include.text',
      item.title
    )

    cy.get(`[data-testid='img-dialog']`).should('have.attr', 'src', item.url)
    console.log(collaborator.name)
    cy.get(`[data-testid='select-collaborators']`).select(
      collaborator.name + ' - ' + collaborator.email,
      {
        force: true
      }
    )
    cy.get(`[data-testid='save-button']`).click()

    cy.get(`[data-testid='item-${item.id}-status']`).should(
      'include.text',
      collaborator.name
    )
  })
})

describe('Verifica se é possível devolver um item', () => {
  let items = []

  beforeEach(() => {
    cy.login('admin@teste.com', '12345678')

    cy.wait(1000)

    cy.openSidebar()

    cy.contains('Empréstimo').click()

    cy.request('GET', '/inventory')
      .as('getItems')
      .then(interception => {
        items = interception.body.rows
      })
  })

  it('Devolve um item com sucesso', () => {
    const item = selectARandomBorrowedItem(items)

    cy.get(`[data-testid='item-${item.id}']`)
      .should('include.text', item.title)
      .click()

    cy.get(`[data-testid='item-${item.id}-borrow-or-return-button']`)
      .should('include.text', 'Devolver Item')
      .click()

    cy.get('.m-dialog--confirm-btn').click()

    cy.get(`[data-testid='item-${item.id}-status']`).should(
      'include.text',
      'Item disponível'
    )
  })
})
