// 移除Modal
export default function destroy() {
  let modalId = '__SeedsUI_modal_el__'
  let mask = document.getElementById(modalId)
  if (mask) {
    // 动画移除
    mask.classList.remove('active')
    mask.querySelector('.modal-alert').classList.remove('active')

    // DOM移除
    if (mask.timeout) window.clearTimeout(mask.timeout)
    mask.timeout = setTimeout(() => {
      mask.parentNode.removeChild(mask)
    }, 300)
  }
}
