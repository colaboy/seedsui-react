import confirm from './confirm'

let alert = (props) => {
  return confirm({ cancelProps: null, ...props })
}
export default alert
