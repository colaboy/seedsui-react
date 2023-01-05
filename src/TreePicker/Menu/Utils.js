export default {
  // 重置所有选项
  clearActive({ rootRef }) {
    let originActives = rootRef.current.querySelectorAll('.active')
    if (originActives && originActives.length) {
      for (let i = 0, originActive; (originActive = originActives[i++]); ) {
        originActive.classList.remove('expand')
        originActive.classList.remove('active')
      }
    }
  },
  // 获取先辈节点
  getPredecessorDOM({ rootRef, ids, list }) {
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
    this.clearActive({ rootRef })

    // 获取所有需要选中展开项
    let needActives = null
    if (Array.isArray(value) && value[0] && value[0].id) {
      needActives = this.getPredecessorDOM({ rootRef, ids: [value[0].id], list })
    }

    // 选中dom
    if (needActives && needActives.length) {
      for (let i = 0, needActive; (needActive = needActives[i++]); ) {
        needActive.classList.add('active')
        needActive.classList.add('expand')
      }
    }
  },
  // 展开关键字
  expandKeyword({ rootRef, keyword, list }) {
    if (!rootRef?.current || !list || !list.length) return
    this.clearActive({ rootRef })

    // 获取所有需要选中展开项
    let ids = []
    let needActives = null
    for (let item of list) {
      if (item.name.indexOf(keyword) !== -1) {
        ids.push(item.id)
      }
    }
    needActives = this.getPredecessorDOM({ rootRef, ids: ids, list })

    // 选中dom
    if (needActives && needActives.length) {
      for (let i = 0, needActive; (needActive = needActives[i++]); ) {
        needActive.classList.add('expand')
      }
    }
  }
}
