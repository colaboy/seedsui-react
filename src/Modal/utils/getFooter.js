import locale from './../../locale'

// 底部
function getFooter({ cancelProps, submitProps, footerProps, onVisibleChange }) {
  let footer = []

  // 点击事件
  async function handleClick(e, onClick) {
    e.stopPropagation()
    if (typeof onClick === 'function') {
      let goOn = await onClick(e)
      if (goOn === false) return
    }
    onVisibleChange && onVisibleChange(false)
  }

  // 取消
  const { caption: cancelText, onClick: onCancelClick, ...otherCancelProps } = cancelProps || {}
  if (cancelText || onCancelClick) {
    footer.push(
      <div
        key="footer-cancel"
        onClick={(e) => {
          handleClick(e, onCancelClick)
        }}
        {...otherCancelProps}
        className={`modal-cancel${
          otherCancelProps.className ? ' ' + otherCancelProps.className : ''
        }`}
      >
        {cancelText || locale('取消', 'cancel')}
      </div>
    )
  }

  // 确定
  const { caption: submitText, onClick: onSubmitClick, ...otherSubmitProps } = submitProps || {}
  if (submitText || onSubmitClick) {
    footer.push(
      <div
        key="footer-ok"
        onClick={(e) => {
          handleClick(e, onSubmitClick)
        }}
        {...otherSubmitProps}
        className={`modal-ok${otherSubmitProps.className ? ' ' + otherSubmitProps.className : ''}`}
      >
        {submitText || locale('确定', 'ok')}
      </div>
    )
  }

  if (footer.length) {
    footer = (
      <div
        {...footerProps}
        className={`modal-footer${footerProps?.className ? ' ' + footerProps.className : ''}`}
      >
        {footer}
      </div>
    )
  } else {
    footer = null
  }

  return footer
}

export default getFooter
