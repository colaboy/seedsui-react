import React, { useState } from 'react'
import Storage from './../Storage'

/**
 * 页面数据缓存功能
 */
function useCacheState(value, options) {
  /**
   * options缓存配置
   * @param {String} name - 唯一的缓存名称, 必填项, 默认无
   * @param {Boolean} persist - 是否永久缓存, 默认false
   */
  const { name: cacheName, persist } = options || {}
  let cacheValue = cacheName
    ? window[cacheName] || Storage.getLocalStorage(cacheName) || value
    : value

  // 非永久缓存直接读取window变量缓存
  let [cache, setCache] = useState(cacheValue)

  return [
    cache,
    (newValue) => {
      if (newValue === undefined) {
        if (persist) Storage.removeLocalStorage(cacheName)
        delete window[cacheName]
      } else {
        if (persist) Storage.setLocalStorage(cacheName, newValue)
        window[cacheName] = newValue
      }
      setCache(newValue)
    }
  ]
}

export default useCacheState
