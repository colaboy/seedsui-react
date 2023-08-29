// Add Item to value
function addItem(item, value, multiple) {
  if (!Array.isArray(value) || !value.length || multiple === undefined) return [item]

  // Check is it checked
  const isChecked = value.some((option) => option.id === item.id)

  // If checked, delete this item
  if (isChecked) {
    return value.filter((option) => option.id !== item.id)
  }
  // If unchecked, add this item
  else {
    // Multiple select
    if (multiple) {
      return [...value, item]
    }
    // Single select
    else {
      return [item]
    }
  }
}

export default addItem
