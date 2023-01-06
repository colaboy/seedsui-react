export default {
  // 获取状态
  getDOM({ rootRef, id }) {
    let activeId = id
    let current = rootRef.current.querySelector(`[data-id='${activeId}']`)
    return current
  },
  // 重置class
  clearClass({ rootRef, classNames }) {
    let originActives = rootRef.current.querySelectorAll(`.${classNames.join(',.')}`)
    if (originActives && originActives.length) {
      for (let i = 0, originActive; (originActive = originActives[i++]); ) {
        for (let className of classNames) {
          originActive.classList.remove(className)
        }
      }
    }
  },
  // 获取先辈节点
  getPredecessorDOM({ rootRef, ids, list }) {
    if (!ids || !ids.length) return null
    // 获取所有需要选中展开项
    let nodes = []
    for (let id of ids) {
      nodes = nodes.concat(list.getDeepTreePredecessor(id))
      nodes = nodes.concat({ id: id })
    }

    if (!nodes.length) {
      return null
    }
    // 获取所有dom
    let query = []
    for (let node of nodes) {
      query.push(`[data-id='${node.id}']`)
    }
    query = query.join(',')
    return rootRef.current.querySelectorAll(query)
  },
  // 选中先辈并展开
  active({ rootRef, value, list }) {
    if (!rootRef?.current || !list || !list.length) return
    this.clearClass({ rootRef, classNames: ['active', 'expand'] })

    // 获取所有需要选中项, 当前项若展开则收缩
    let current = null // 当前项
    let currentExpand = true // 当前项是否展开
    let needActives = null
    if (Array.isArray(value) && value[0] && value[0].id) {
      current = this.getDOM({ rootRef, id: value[0].id })
      currentExpand = current.classList.contains('expand')
      needActives = this.getPredecessorDOM({ rootRef, ids: [value[0].id], list })
    }

    // 选中dom
    if (needActives && needActives.length) {
      for (let i = 0, needActive; (needActive = needActives[i++]); ) {
        needActive.classList.add('active')
        needActive.classList.add('expand')
      }
    }

    // 点击dom
    if (currentExpand) {
      current.classList.remove('expand')
    } else {
      current.classList.add('expand')
    }
  },
  // 展开关键字
  expandKeyword({ rootRef, keyword, list }) {
    if (!rootRef?.current || !list || !list.length || keyword === null || keyword === undefined) {
      return
    }

    // 取消所有展开项
    this.clearClass({ rootRef, classNames: ['expand'] })

    // 如果清空, 则只需要取消所有展开项即可
    if (keyword === '') {
      return
    }

    // 获取所有需要选中展开项
    let ids = []
    let needExpands = null
    function loop(children) {
      for (let item of children) {
        if (item.name.indexOf(keyword) !== -1) {
          ids.push(item.id)
        }
        if (Array.isArray(item.children) && item.children.length) {
          loop(item.children)
        }
      }
    }
    loop(list)

    needExpands = this.getPredecessorDOM({ rootRef, ids: ids, list })

    // 选中dom
    if (needExpands && needExpands.length) {
      for (let i = 0, needExpand; (needExpand = needExpands[i++]); ) {
        needExpand.classList.add('expand')
      }
    }
  }
}
