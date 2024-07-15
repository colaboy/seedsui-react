// 移除Toast
// eslint-disable-next-line
export default function destroy() {
  let toastId = '__SeedsUI_toast_el__'
  let mask = document.getElementById(toastId)

  if (mask) {
    if (mask.timeout) window.clearTimeout(mask.timeout)
    mask.timeout = setTimeout(() => {
      mask.parentNode.removeChild(mask)
    }, 300)
  }
}
