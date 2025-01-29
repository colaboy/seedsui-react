function getDisplayValue(value) {
  if (!Array.isArray(value) || !value.length) return ''

  let names = value.map((item) => item.name)
  return names.join(',')
}

export default getDisplayValue
