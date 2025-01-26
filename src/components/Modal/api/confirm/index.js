import destroy from './../destroy'

import showMask from './showMask'
import updateAttribute from './updateAttribute'

// 弹出对话框
export default function confirm({
  portal,

  maskClosable,
  onVisibleChange,

  // 遮罩
  maskProps,

  // 标题
  title,
  titleProps,

  // 内容
  content,
  contentProps,

  // 底部
  footerProps,

  // 确定, 默认显示确定按钮
  submit,
  onSubmit,
  submitProps,

  // 取消, confirm默认显示取消按钮
  cancel,
  onCancel,
  cancelProps
}) {
  let mask = null

  // 点击遮罩
  function handleMaskClick(e) {
    e.stopPropagation()

    // 点击确定或取消按钮
    if (e.target.classList.contains('modal-cancel') || e.target.classList.contains('modal-ok')) {
      handleButtonClick(e)
      return
    }

    // 点击遮罩
    if (e.target.classList.contains('mask')) {
      // 读取更新后的属性
      const maskClosable = mask?.maskClosable
      const onVisibleChange = mask?.onVisibleChange

      if (maskClosable) {
        if (onVisibleChange) onVisibleChange(false)
        destroy(e.currentTarget)
      }
    }
  }

  // 点击确定或者取消按钮
  function handleButtonClick(e) {
    let isOk = e.target.classList.contains('modal-ok')

    // 读取更新后的属性
    const onClick = isOk ? mask?.onSubmit : mask?.onCancel
    const onVisibleChange = mask?.onVisibleChange

    if (typeof onClick === 'function') {
      let close = onClick() ?? true
      if (close) {
        if (onVisibleChange) onVisibleChange(false)
        destroy(e.currentTarget.closest('.modal-mask'))
      }
    } else {
      if (onVisibleChange) onVisibleChange(false)
      destroy(e.currentTarget.closest('.modal-mask'))
    }
    e.stopPropagation()
  }

  // 渲染与绑定事件
  mask = showMask({
    portal,
    onMaskClick: handleMaskClick
  })

  // 更新属性
  updateAttribute(mask, {
    portal,

    maskClosable,
    onVisibleChange,

    // 遮罩
    maskProps,

    // 标题
    title,
    titleProps,

    // 内容
    content,
    contentProps,

    // 底部
    footerProps,

    // 确定, 默认显示确定按钮
    submit,
    onSubmit,
    submitProps,

    // 取消, confirm默认显示取消按钮
    cancel,
    onCancel,
    cancelProps
  })

  return mask
}
