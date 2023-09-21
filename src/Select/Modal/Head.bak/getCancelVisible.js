// 是否显示取消按钮
function getCancelVisible(props, onClick) {
  let visible = props?.visible

  if (!props?.onClick && !onClick) {
    visible = false
  }
  return visible !== false
}

export default getCancelVisible
