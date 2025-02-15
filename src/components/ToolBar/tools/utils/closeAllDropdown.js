// Toolbar转换成参数
function closeAllDropdown() {
  for (let dropdownRef of window.dropdownRefs || []) {
    if (dropdownRef?.current?.close) {
      dropdownRef.current.close()
    }
  }
}

export default closeAllDropdown
