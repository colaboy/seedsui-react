import confirm from './confirm'

// 弹出alert框
let alert = (props) => {
  return confirm({ cancelProps: null, ...props })
}
export default alert
