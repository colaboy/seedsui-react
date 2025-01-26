// 是否显示确认按钮, 默认不显示确定按钮
function getSubmitVisible(props, onClick) {
  if (props?.visible !== undefined) {
    return props.visible
  }
  if (props?.onClick || onClick) {
    return true
  }
  return false
}

export default getSubmitVisible
