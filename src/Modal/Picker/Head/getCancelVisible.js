// 是否显示取消按钮
function getCancelVisible(props, onClick) {
  if (props?.visible !== undefined) {
    return props.visible
  }
  if (props?.onClick || onClick) {
    return true
  }
  return false
}

export default getCancelVisible
