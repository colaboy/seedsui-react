// 移除Loading
// eslint-disable-next-line
export default function (props) {
  function destroy() {
    let loadingId = props?.id || '__SeedsUI_loading_el__'
    let loadingDOM = document.getElementById(loadingId)

    if (loadingDOM) {
      loadingDOM.parentNode.removeChild(loadingDOM)
    }
  }
  destroy()
}
