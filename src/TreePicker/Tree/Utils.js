import React from 'react'
import HighlightKeyword from './../../HighlightKeyword'

export default {
  // 获取选中项
  getCheckedKeysProp(value, defaultValue) {
    let val = value || defaultValue
    let checkedKeys = []
    if (Array.isArray(val) && val.length) {
      for (let item of val) {
        if (typeof item.id === 'string' || typeof item.id === 'number') {
          checkedKeys.push(item.id)
        }
      }
    }
    // value or defaultValue
    let valueProp = {}
    if (value) {
      valueProp = {
        checkedKeys: checkedKeys
      }
    } else if (defaultValue) {
      valueProp = {
        defaultCheckedKeys: checkedKeys
      }
    }
    return valueProp
  },
  // 构建渲染数据, 支持关键字搜索
  getTreeData({ list: originData, keyword, itemRender }) {
    if (
      // 必须是数组
      !Array.isArray(originData) ||
      !originData.length ||
      // 必须有id和name属性
      !originData[0]?.id ||
      !originData[0]?.name
    ) {
      console.error('SeedsUI TreePicker.Tree: list参数不正确')
      return []
    }
    // 关键字搜索
    const loop = (data) =>
      data.map((item) => {
        let titleNode = <HighlightKeyword text={item.name} keyword={keyword} />

        // 自定义渲染
        if (typeof itemRender === 'function') {
          let customTitleNode = itemRender(item, {
            keyword: keyword
          })
          if (customTitleNode) {
            titleNode = customTitleNode
          }
        }

        if (item.children) {
          return {
            ...item,
            title: titleNode,
            children: loop(item.children)
          }
        }
        return {
          ...item,
          title: titleNode
        }
      })
    return loop(originData)
  },
  // 名称匹配拼音, 返回匹配到的汉字
  getKeywordIdsByPinyin(keyword, name) {
    if (!name || typeof name !== 'string') return ''
    if (!keyword) return name
    let pinyinIndex = name?.toPinyin()?.indexOf(keyword.toLowerCase())
    if (pinyinIndex !== -1) {
      return name
    }
    return ''
  },
  // 获取关键字的所有匹配的keys
  getKeywordIds(keyword, flattenTree) {
    if (!keyword || typeof keyword !== 'string') return []
    let keys = []
    for (let node of flattenTree) {
      if (node.name && node.name.indexOf(keyword) !== -1) {
        keys.push(node.id)
      }
    }

    // 如果没有匹配到, 再根据拼音匹配
    /*
    if (keys.length < 1 && keyword && /^[a-zA-Z]+$/.test(keyword)) {
      for (let item of flattenTree) {
        if (this.getKeywordIdsByPinyin(keyword, item.name)) {
          keys.push(item.id)
          break
        }
      }
    }
    */
    return keys
  },
  // 根据id获取你级的id
  getExpandedKeys(keyword, flattenTree) {
    // 获取所有选中项
    const ids = this.getKeywordIds(keyword, flattenTree)

    // 获取所有选中项的所有的父级
    let expandedKeys = []
    for (let id of ids) {
      const parentId = flattenTree.getFlattenTreeNode(id).parentid
      const predecessors = flattenTree.getFlattenTreePredecessors(parentId)
      for (let node of predecessors) {
        if (expandedKeys.indexOf(node.id) === -1) {
          expandedKeys.push(node.id)
        }
      }
    }
    return expandedKeys
  }
}