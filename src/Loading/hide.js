import ReactRender from './../ReactRender'

// 移除Loading
// eslint-disable-next-line
export default function () {
  const MARK = '__SeedsUI_root__'
  function destroy() {
    let modal = document.getElementById('__SeedsUI_loading_el__')
    if (!modal || !window.SeedsUIReactLoadingContainer) return
    // 调用React中动态组件的unmount
    if (window.SeedsUIReactLoadingContainer[MARK]) {
      ReactRender.unmount(window.SeedsUIReactLoadingContainer)
    }
    // 组件未找到, 则直接移除dom
    else {
      modal.parentNode.removeChild(modal)
    }
  }
  destroy()
}
