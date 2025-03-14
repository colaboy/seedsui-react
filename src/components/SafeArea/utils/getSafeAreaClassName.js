// getSafeAreaClassName by safeArea
function getSafeAreaClassName(safeArea) {
  return (
    // (safeArea === 'auto' && ' autoSafeArea') ||
    (safeArea === true && ' autoSafeArea') || (safeArea === false && ' clearSafeArea') || ''
  )
}

export default getSafeAreaClassName
