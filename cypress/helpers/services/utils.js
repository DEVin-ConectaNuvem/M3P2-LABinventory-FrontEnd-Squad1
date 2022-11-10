export function selectARandomIndex(array) {
  const randomindex = Math.floor(Math.random() * array.length);
  return randomindex;
}

export function selectARandomAvailableItem(items) {
  items = items.filter(({ collaborator }) => !collaborator);

  const index = selectARandomIndex(items);
  const item = items[index];

  return item;
}

export function selectARandomCollaborator(collaborators) {
  const index = selectARandomIndex(collaborators);
  const item = collaborators[index];

  return item;
}