// 动态属性
function getDynamicProps({ BaseProps, value, defaultPickerValue, ...otherProps }) {
  let dynamicProps = BaseProps || {}
  if (BaseProps?.value === undefined && value !== undefined) {
    dynamicProps.value = value
  }
  if (BaseProps?.defaultPickerValue === undefined && defaultPickerValue !== undefined) {
    dynamicProps.defaultPickerValue = defaultPickerValue
  }

  // 动态增加属性
  for (let n in otherProps) {
    if (otherProps[n] !== undefined) {
      dynamicProps[n] = otherProps[n]
    }
  }
  return dynamicProps
}

export default getDynamicProps
