// eslint-disable-next-line
export default {
  getDisplayValue: function ({ value, separator = ',' }) {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (!Array.isArray(value) || !value.length) return ''
    let names = []
    for (let item of value) {
      if (item?.name) {
        names.push(item.name)
      }
    }
    return names.join(separator)
  }
}
