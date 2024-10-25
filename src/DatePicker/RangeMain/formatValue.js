// Format value
function formatValue(value, { min, max }) {
  if (!Array.isArray(value) || !value.length) {
    return [min || new Date(), max || new Date()]
  }
  return value
}

export default formatValue
