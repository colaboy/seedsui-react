// 移除Loading
// eslint-disable-next-line
export default function destroy(props) {
  let loadingId = props?.id || '__SeedsUI_loading_mask__'
  let mask = document.getElementById(loadingId)

  if (mask) {
    mask.parentNode.removeChild(mask)
  }
}
