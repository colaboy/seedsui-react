// 移除Toast
// eslint-disable-next-line
export default function destroy() {
  let toastId = '__SeedsUI_toast_el__'
  let toastDOM = document.getElementById(toastId)

  if (toastDOM) {
    if (toastDOM.timeout) window.clearTimeout(toastDOM.timeout)
    toastDOM.timeout = setTimeout(() => {
      toastDOM.parentNode.removeChild(toastDOM)
    }, 300)
  }
}
