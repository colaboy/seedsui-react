import clearClass from './clearClass'
import getPredecessorDOM from './getPredecessorDOM'

// 展开关键字
function expandKeyword({ rootRef, keyword, list }) {
  if (!rootRef?.current || !list || !list.length || keyword === null || keyword === undefined) {
    return
  }

  // 取消所有展开项
  clearClass({ rootRef, classNames: ['expand'] })

  // 如果清空, 则只需要取消所有展开项即可
  if (keyword === '') {
    return
  }

  // 获取所有需要选中展开项
  let ids = []
  let needExpands = null
  function loop(children) {
    for (let item of children) {
      if (item?.name?.indexOf(keyword) !== -1) {
        ids.push(item.id)
      }
      if (Array.isArray(item.children) && item.children.length) {
        loop(item.children)
      }
    }
  }
  loop(list)

  needExpands = getPredecessorDOM({ rootRef, ids: ids, list })

  // 选中dom
  if (needExpands && needExpands.length) {
    for (let i = 0, needExpand; (needExpand = needExpands[i++]); ) {
      needExpand.classList.add('expand')
    }
  }
}

export default expandKeyword
