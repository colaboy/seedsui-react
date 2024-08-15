import hide from './hide'

// 显示Toast
// eslint-disable-next-line
function show(props) {
  const {
    // Visible duration
    duration,
    maskClickable,
    // Pop position: top、middle、bottom
    position,
    id,
    maskProps,
    className,
    style,
    // Content html text
    content,
    onVisibleChange
  } = {
    ...(this?.defaultProps || {}),
    ...(props || {})
  }

  // 渲染
  function render() {
    let toastId = id || '__SeedsUI_toast_el__'
    // 如果没生成成功, 则强制生成
    let mask = document.getElementById(toastId)
    if (!mask) {
      // Create mask
      mask = document.createElement('div')

      mask.innerHTML = `<div class="toast">
        <div class="toast-wrapper">
          <div class="toast-content"></div>
        </div>
      </div>`
      // 添加到dom上
      ;(document.getElementById('root') || document.body).appendChild(mask)
    }

    // Update mask
    mask.setAttribute(
      'class',
      `mask toast-mask${maskProps?.className ? ' ' + maskProps?.className : ''}${
        maskClickable !== false ? ' toast-propagation' : ''
      }`
    )
    mask.setAttribute('id', toastId)
    mask.setAttribute('style', '')
    for (let key in maskProps?.style || {}) {
      mask.style[key] = maskProps?.style[key]
    }

    // Update container
    let container = mask.querySelector('.toast')
    if (container) {
      container?.setAttribute('class', `toast ${position || 'middle'}`)
    }

    // Update wrapper
    let wrapper = mask.querySelector('.toast-wrapper')
    if (wrapper) {
      wrapper?.setAttribute('class', `toast-wrapper ${className ? ' ' + className : ''}`)
      wrapper?.setAttribute('style', '')
      for (let key in style || {}) {
        wrapper.style[key] = style[key]
      }
    }

    // Update content
    let contentDOM = mask.querySelector('.toast-content')
    if (contentDOM) {
      contentDOM.innerHTML = content || ''
    }

    // Open toast
    mask.classList.add('active')
    mask.childNodes[0].classList.add('active')

    if (typeof onVisibleChange === 'function') {
      onVisibleChange(true)
    }

    // 显示数秒后隐藏
    if (mask.showTimeout) window.clearTimeout(mask.showTimeout)
    mask.showTimeout = setTimeout(
      () => {
        hide()
        if (typeof onVisibleChange === 'function') {
          onVisibleChange(false)
        }
      },
      typeof duration === 'number' ? duration : 2000
    )

    // 返回节点
    return mask
  }
  return render()
}

export default show
