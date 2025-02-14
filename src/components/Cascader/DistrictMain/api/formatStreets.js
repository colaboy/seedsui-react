function formatStreets(list, districtId) {
  if (typeof list === 'string') return list
  if (!Array.isArray(list) || list.length === 0) return null

  return list.map((item) => {
    return {
      parentid: districtId,
      name: item.text,
      id: item.id,
      type: ['street'],
      isStreet: true,
      isLeaf: true
    }
  })
}

export default formatStreets
