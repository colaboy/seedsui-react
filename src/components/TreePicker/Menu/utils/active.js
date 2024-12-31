import clearClass from './clearClass'
import getDOM from './getDOM'
import getPredecessorDOM from './getPredecessorDOM'

// 选中先辈并展开
function active({ rootRef, value, list }) {
  if (!rootRef?.current || !list || !list.length) return
  clearClass({ rootRef, classNames: ['active', 'expand'] })

  // 获取所有需要选中项, 当前项若展开则收缩
  let current = null // 当前项
  let currentExpand = true // 当前项是否展开
  let needActives = null
  if (
    Array.isArray(value) &&
    value[0] &&
    (typeof value[0].id === 'string' || typeof value[0].id === 'number')
  ) {
    current = getDOM({ rootRef, id: value[0].id })
    // 记录点击dom的展开状态
    if (current) {
      currentExpand = current.classList.contains('expand')
    }
    needActives = getPredecessorDOM({ rootRef, ids: [value[0].id], list })
  }

  // 选中dom
  if (needActives && needActives.length) {
    for (let i = 0, needActive; (needActive = needActives[i++]); ) {
      needActive.classList.add('active')
      needActive.classList.add('expand')
    }
  }

  // 点击dom收展
  if (current) {
    if (currentExpand) {
      current.classList.remove('expand')
    } else {
      current.classList.add('expand')
    }
  }
}

export default active
