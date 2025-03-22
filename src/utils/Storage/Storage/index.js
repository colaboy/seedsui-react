import localforage from 'localforage'
import LocalStorage from './LocalStorage'
import SessionStorage from './SessionStorage'

// 文档: https://localforage.docschina.org/#api
const Storage = {
  ...LocalStorage,
  ...SessionStorage,
  // 从仓库中获取 key 对应的值并将结果提供给回调函数。如果 key 不存在，getItem() 将返回 null。
  getItem: (key, successCallback) => {
    if (!key) {
      console.error('Storage.getItem: key is empty')
      successCallback && successCallback(null, null)
      return null
    }
    return localforage.getItem(key, successCallback)
  },
  // 将数据保存到离线仓库。
  setItem: (key, value, successCallback) => {
    if (!key) {
      console.error('Storage.setItem: key is empty')
      successCallback && successCallback(null, null)
      return null
    }
    return localforage.setItem(key, value, successCallback)
  },
  // 从离线仓库中删除 key 对应的值。
  removeItem: (key, successCallback) => {
    if (!key) {
      console.error('Storage.removeItem: key is empty')
      successCallback && successCallback(null, undefined)
      return undefined
    }
    return localforage.removeItem(key, successCallback)
  },
  // 从数据库中删除所有的 key，重置数据库。
  clear: (successCallback) => {
    return localforage.clear(successCallback)
  }
}

export default Storage
