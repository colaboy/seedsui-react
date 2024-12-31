import DataParse from './DataParse'

// DB 本地数据库
var IndexDB = (function () {
  // 获取不同内核的indexdb
  let indexedDB =
    window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB

  // 数据库
  let dbName = 'SeedsUI_IndexDB'
  let dbTableName = 'SeedsUI_IndexDB_Table'
  var db = null

  // 打开仓库, 如果没有此仓库会创建一个
  function open() {
    return new Promise((resolve) => {
      var request = indexedDB.open(dbName)
      request.onerror = function (event) {
        console.log('SeedsUI IndexDB: 打开数据库报错', event)
        resolve(false)
      }
      request.onsuccess = function (event) {
        db = event.target.result
        resolve(true)
      }
      // 打开数据库不存在创建新仓库时, 则会触发更新事件, 新增一张叫做SeedsUI_IndexDB_Table的表格，主键是id
      request.onupgradeneeded = function (event) {
        db = event.target.result
        // 判断SeedsUI_IndexDB_Table表是否存在, 不存在则创建一个
        if (!db.objectStoreNames.contains(dbTableName)) {
          db.createObjectStore(dbTableName, { keyPath: 'id' })
        }
      }
    })
  }
  // 默认打开数据库
  open()

  // 新增数据
  function add(id, data) {
    if (!id || !data) return null
    return new Promise(async (resolve) => {
      // 如果数据库不存在, 则新建数据库
      if (!db) {
        let openResult = await open()
        if (!openResult) {
          resolve(false)
          return
        }
      }
      var request = db
        .transaction([dbTableName], 'readwrite')
        .objectStore(dbTableName)
        .add({ id: id, data: data })

      request.onsuccess = function () {
        resolve(true)
      }

      request.onerror = function (event) {
        console.log('SeedsUI IndexDB: 数据写入失败', event)
        resolve(false)
      }
    })
  }

  // 更新数据
  function update(id, data) {
    if (!id || !data) return null
    return new Promise(async (resolve) => {
      // 如果数据库不存在, 则新建数据库
      if (!db) {
        let openResult = await open()
        if (!openResult) {
          resolve(false)
          return
        }
      }

      var request = db
        .transaction([dbTableName], 'readwrite')
        .objectStore(dbTableName)
        .put({ id: id, data: data })

      request.onsuccess = function () {
        resolve(true)
      }

      request.onerror = function (event) {
        console.log('SeedsUI IndexDB: 数据更新失败', event)
        resolve(false)
      }
    })
  }

  // 移除数据
  function remove(id) {
    if (!id) return null
    return new Promise(async (resolve) => {
      // 如果数据库不存在, 则新建数据库
      if (!db) {
        let openResult = await open()
        if (!openResult) {
          resolve(false)
          return
        }
      }

      var request = db.transaction([dbTableName], 'readwrite').objectStore(dbTableName).delete(id)

      request.onsuccess = function () {
        resolve(true)
      }

      request.onerror = function (event) {
        console.log('SeedsUI IndexDB: 数据删除失败', event)
        resolve(false)
      }
    })
  }

  // 删除所有数据
  function removeAll() {
    return new Promise(async (resolve) => {
      // 如果数据库不存在, 则新建数据库
      if (!db) {
        let openResult = await open()
        if (!openResult) {
          resolve(false)
          return
        }
      }

      var request = db.transaction([dbTableName], 'readwrite').objectStore(dbTableName).clear()

      request.onsuccess = function () {
        resolve(true)
      }

      request.onerror = function (event) {
        console.log('SeedsUI IndexDB: 表格清除失败', event)
        resolve(false)
      }
    })
  }

  // 获取数据
  function get(id) {
    if (!id || typeof id !== 'string') return null
    return new Promise(async (resolve) => {
      // 如果数据库不存在, 则新建数据库
      if (!db) {
        let openResult = await open()
        if (!openResult) {
          resolve(null)
          return
        }
      }

      var request = db.transaction([dbTableName]).objectStore(dbTableName).get(id)

      request.onsuccess = function () {
        if (request.result) {
          resolve(request.result)
        } else {
          resolve(null)
        }
      }
      request.onerror = function (event) {
        console.log(`SeedsUI IndexDB: 根据id: ${id}, 获取数据失败`, event)
        resolve(null)
      }
    })
  }

  // 获取所有数据
  function getAll() {
    return new Promise(async (resolve) => {
      // 如果数据库不存在, 则新建数据库
      if (!db) {
        let openResult = await open()
        if (!openResult) {
          resolve(null)
          return
        }
      }

      var request = db.transaction([dbTableName]).objectStore(dbTableName).openCursor()
      // 构建数据列表: {id: '', data: ''}
      let list = []
      request.onsuccess = function (event) {
        var cursor = event.target.result
        if (cursor) {
          list.push(cursor.value)
          cursor.continue()
        } else {
          resolve(list)
        }
      }
      request.onerror = function (event) {
        console.log(`SeedsUI IndexDB: 获取所有数据失败`, event)
        resolve(null)
      }
    })
  }

  return {
    indexedDB: indexedDB,
    set: function (key, val) {
      return new Promise(async (resolve) => {
        let exists = await get(key)
        let result = null
        if (exists) {
          result = await update(key.toString(), DataParse.stringify(val))
        } else {
          result = await add(key.toString(), DataParse.stringify(val))
        }
        resolve(result)
      })
    },
    get: function (key) {
      return new Promise(async (resolve) => {
        let result = await get(key)
        if (result && result.data) {
          resolve(DataParse.parse(result.data))
          return
        }
        resolve(null)
      })
    },
    getAll: function () {
      return new Promise(async (resolve) => {
        // 获取所有数据
        let list = await getAll()
        if (Array.isArray(list) && list.length) {
          // 列表数据转为键值对数据
          let allResult = {}
          for (let item of list) {
            if (item.id) {
              allResult[item.id] = DataParse.parse(item.data)
            }
          }
          resolve(allResult)
          return
        }
        resolve(null)
      })
    },
    remove: remove,
    clear: removeAll
  }
})()

export default IndexDB
