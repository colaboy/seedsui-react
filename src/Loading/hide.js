import ReactRender from './../ReactRender'

// 移除Loading
// eslint-disable-next-line
export default function () {
  function destroy() {
    let modal = document.getElementById('__SeedsUI_loading_el__')
    if (!modal || !window.SeedsUIReactLoadingContainer) return
    ReactRender.unmount(window.SeedsUIReactLoadingContainer)
  }
  destroy()
}
