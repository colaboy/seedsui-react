// getSafeAreaClassName by safeArea
function getSafeAreaClassName(safeArea) {
  return (
    (safeArea === 'auto' && ' autoSafeArea') ||
    (safeArea === true && ' safeArea') ||
    (safeArea === false && ' clearSafeArea') ||
    ''
  )
}

export default getSafeAreaClassName
