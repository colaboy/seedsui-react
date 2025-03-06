import localforage from 'localforage'
import LocalStorage from './LocalStorage'
import SessionStorage from './SessionStorage'

// 内库使用-start
import Device from './../../Device'
// 内库使用-end

/* 测试使用-start
import {  Device } from 'seedsui-react'
测试使用-end */

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

    if (Device.platform === 'wq' && Device.compareVersion(Device.platformVersion, '7.2.20') >= 0) {
      return new Promise((resolve) => {
        window.top.wq.getStorage({
          key: key,
          success: function (res) {
            let data = res.data || null
            try {
              data = JSON.parse(res.data)
            } catch (error) {
              data = res.data || null
            }

            successCallback && successCallback(null, data)
            resolve(data)
          },
          fail: (err) => {
            console.error('Storage.getItem:', err)
            successCallback && successCallback(err, null)
            resolve(null)
          }
        })
      })
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

    if (Device.platform === 'wq' && Device.compareVersion(Device.platformVersion, '7.2.20') >= 0) {
      return new Promise((resolve) => {
        window.top.wq.setStorage({
          key: key,
          data: JSON.stringify(value),
          success: function () {
            successCallback && successCallback(null, value)
            resolve(value)
          },
          fail: (err) => {
            console.error('Storage.setItem:', err)
            successCallback && successCallback(err, value)
            resolve(null)
          }
        })
      })
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

    if (Device.platform === 'wq' && Device.compareVersion(Device.platformVersion, '7.2.20') >= 0) {
      return new Promise((resolve) => {
        window.top.wq.removeStorage({
          key: key,
          success: function () {
            successCallback && successCallback(null, undefined)
            resolve(undefined)
          },
          fail: (err) => {
            console.error('Storage.removeItem:', err)
            successCallback && successCallback(err, undefined)
            resolve(undefined)
          }
        })
      })
    }
    return localforage.removeItem(key, successCallback)
  },
  // 从数据库中删除所有的 key，重置数据库。
  clear: (successCallback) => {
    if (Device.platform === 'wq' && Device.compareVersion(Device.platformVersion, '7.2.20') >= 0) {
      return new Promise((resolve) => {
        window.top.wq.clearStorage({
          success: function () {
            successCallback && successCallback(null, undefined)
            resolve(undefined)
          },
          fail: (err) => {
            console.error('Storage.clear:', err)
            successCallback && successCallback(err, undefined)
            resolve(undefined)
          }
        })
      })
    }
    return localforage.clear(successCallback)
  }
}

export default Storage
