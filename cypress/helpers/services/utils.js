import moment from 'moment'

export function selectARandomIndex(array) {
  const randomindex = Math.floor(Math.random() * array.length)
  return randomindex
}

export function selectARandomAvailableItem(items, limit = 5) {
  items = items.filter(({ collaborator }, i) => !collaborator && i < limit)

  const index = selectARandomIndex(items)
  const item = items[index]

  return item
}

export function selectARandomCollaborator(collaborators) {
  const index = selectARandomIndex(collaborators)
  const item = collaborators[index]

  return item
}

export function selectARandomBorrowedItem(items) {
  items = items.filter(({ collaborator }, i) => collaborator)
  const index = selectARandomIndex(items)
  const item = items[index]

  return item
}

export function selectARandomItem(items) {
  const index = selectARandomIndex(items)

  return items[index]
}

export function formatDate(date, format) {
  return moment(date).format(format)
}
