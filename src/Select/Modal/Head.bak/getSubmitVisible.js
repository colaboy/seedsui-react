// 是否显示确认按钮
function getSubmitVisible(props, onClick) {
  let visible = props?.visible

  if (!props?.onClick && !onClick) {
    visible = false
  }
  return visible !== false
}

export default getSubmitVisible
