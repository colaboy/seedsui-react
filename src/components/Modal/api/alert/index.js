import confirm from './../confirm'

// 弹出alert框
let alert = (props) => {
  return confirm({ cancel: null, ...props })
}
export default alert
