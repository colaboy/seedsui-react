function formatCountries(tree) {
  if (typeof tree === 'string') return tree
  if (!Array.isArray(tree) || tree.length === 0) return null

  return tree.map((node) => {
    node.type = ['country']
    return node
  })
}

export default formatCountries
