import getSyncChildren from './getSyncChildren'
import getAsyncChildren from './getAsyncChildren'

// 获取列表
async function getChildren({ data, id, loadData }) {
  // 根节点
  if (!id) return data

  // 加载同步数据中的子节点
  let children = getSyncChildren({ data, id })

  // 加载异步数据子节点
  if (!Array.isArray(children) && typeof loadData === 'function') {
    children = await getAsyncChildren({ data, id, loadData })
  }

  return children
}

export default getChildren
