import ReactRender from './../ReactRender'

// 移除弹框
function hide() {
  let modal = document.getElementById('__SeedsUI_toast_el__')
  if (!modal) return
  let mask = modal.parentNode
  mask.classList.remove('active')
  modal.classList.remove('active')
  if (window.SeedsUIReactToastContainer) {
    setTimeout(() => {
      ReactRender.unmount(window.SeedsUIReactToastContainer)
    }, 300)
  }
}
export default hide
