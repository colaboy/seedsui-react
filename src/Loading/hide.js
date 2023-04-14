// 移除Loading
// eslint-disable-next-line
export default function () {
  function destroy() {
    let loadingId = '__SeedsUI_loading_el__'
    let loadingDOM = document.getElementById(loadingId)

    if (loadingDOM) {
      loadingDOM.parentNode.removeChild(loadingDOM)
    }
  }
  destroy()
}
