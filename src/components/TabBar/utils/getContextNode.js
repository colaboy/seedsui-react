// 获取context
function getContextNode(context, params) {
  if (typeof context === 'function') {
    return context(params)
  }
  if (typeof context === 'string') {
    return <div className="tabbar-group-tab-context">{context}</div>
  }
  return context
}

export default getContextNode
