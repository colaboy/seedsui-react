import ReactRender from './../ReactRender'

// 移除弹框
function destroy() {
  let modal = document.getElementById('__SeedsUI_modal_el__')
  if (!modal) return
  let mask = modal.parentNode
  mask.classList.remove('active')
  modal.classList.remove('active')
  if (window.SeedsUIReactModalContainer) {
    setTimeout(() => {
      ReactRender.unmount(window.SeedsUIReactModalContainer)
    }, 300)
  }
}
export default destroy
