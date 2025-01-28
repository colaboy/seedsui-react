function formatCountry(tree) {
  if (!tree) return null
  return tree.map((node) => {
    node.type = ['country']
    return node
  })
}

export default formatCountry
