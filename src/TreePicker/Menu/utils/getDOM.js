// 获取状态
function getDOM({ rootRef, id }) {
  let activeId = id
  let current = rootRef.current.querySelector(`[data-id='${activeId}']`)
  return current
}

export default getDOM
