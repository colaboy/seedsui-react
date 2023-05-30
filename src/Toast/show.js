import hide from './hide'

// 显示Toast
// eslint-disable-next-line
function show(props) {
  // 更新属性
  function updateAttribute(mask) {
    if (props?.maskClickable) {
      mask.classList.add('toast-propagation')
    } else {
      mask.classList.remove('toast-propagation')
    }
  }

  // 渲染
  function render() {
    let toastId = '__SeedsUI_toast_el__'
    // 如果没生成成功, 则强制生成
    let mask = document.getElementById(toastId)
    if (!mask) {
      // 创建dom
      mask = document.createElement('div')
      mask.setAttribute('class', `mask toast-mask`)
      mask.setAttribute('id', toastId)
      mask.innerHTML = `<div class="toast ${props?.position || 'middle'}">
        <div class="toast-wrapper">
          <div class="toast-content">${props?.content || ''}</div>
        </div>
      </div>`
      // 添加到dom上
      ;(document.getElementById('root') || document.body).appendChild(mask)
    }

    // 更新toast属性
    updateAttribute(mask)

    // 显示
    mask.classList.add('active')
    mask.childNodes[0].classList.add('active')

    if (typeof props?.onVisibleChange === 'function') {
      props.onVisibleChange(true)
    }

    // 显示数秒后隐藏
    if (mask.showTimeout) window.clearTimeout(mask.showTimeout)
    if (props?.duration === false) return
    mask.showTimeout = setTimeout(() => {
      hide()
      if (typeof props?.onVisibleChange === 'function') {
        props.onVisibleChange(false)
      }
    }, props?.duration || 2000)
  }
  render()
}

export default show
