import hide from './hide'

// 显示Toast
// eslint-disable-next-line
export default function (props) {
  // 渲染
  function render() {
    let toastId = '__SeedsUI_toast_el__'
    // 如果没生成成功, 则强制生成
    let toastDOM = document.getElementById(toastId)
    if (!toastDOM) {
      // 创建dom
      toastDOM = document.createElement('div')
      toastDOM.setAttribute(
        'class',
        `mask toast-mask ${props?.maskClickable ? ' toast-propagation' : ''}`
      )
      toastDOM.setAttribute('id', toastId)
      toastDOM.innerHTML = `<div class="toast ${props?.position || 'middle'}">
        <div class="toast-wrapper">
          <div class="toast-content">${props?.content || ''}</div>
        </div>
      </div>`
      // 添加到dom上
      ;(document.getElementById('root') || document.body).appendChild(toastDOM)
    }
    // 显示
    toastDOM.classList.add('active')
    toastDOM.childNodes[0].classList.add('active')

    if (typeof props?.onVisibleChange === 'function') {
      props.onVisibleChange(true)
    }

    // 显示数秒后隐藏
    if (toastDOM.showTimeout) window.clearTimeout(toastDOM.showTimeout)
    if (props?.duration === false) return
    toastDOM.showTimeout = setTimeout(() => {
      hide()
      if (typeof props?.onVisibleChange === 'function') {
        props.onVisibleChange(false)
      }
    }, props?.duration || 2000)
  }
  render()
}
