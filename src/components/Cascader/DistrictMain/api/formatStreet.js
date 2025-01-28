function formatStreet(list, districtId) {
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

export default formatStreet
