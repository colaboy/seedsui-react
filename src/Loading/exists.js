// Loading是否存在
// eslint-disable-next-line
export default function (props) {
  let modal = document.getElementById(props?.id || '__SeedsUI_loading_el__')
  if (modal) return true
  return false
}
