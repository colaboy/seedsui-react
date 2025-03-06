import React, { useState } from 'react'
import getStorage from './getCache'
import setStorage from './setCache'
import clearStorage from './clearCache'

/**
 * 页面数据缓存功能
 */
function useCacheState(value, options) {
  /**
   * options缓存配置
   * @param {String} name - 唯一的缓存名称, 必填项, 默认无
   * @param {Boolean} persist - 是否永久缓存, 默认false
   */
  const { name: cacheName } = options || {}
  let cacheValue = cacheName ? getStorage(cacheName) || value : value

  // 非永久缓存直接读取window变量缓存
  let [cache, setCache] = useState(cacheValue)

  return [
    cache,
    cacheName
      ? (newValue) => {
          setStorage(newValue, options)
          setCache(newValue)
        }
      : setCache
  ]
}

export { setStorage as setCache, getStorage as getCache, clearStorage as clearCache }
export default useCacheState
