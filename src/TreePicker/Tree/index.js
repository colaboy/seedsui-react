import React, { useEffect, useMemo, useState, useRef } from 'react'
import Tree from 'rc-tree'

import locale from './../../locale' // 国际化

import Utils from './Utils'
import Input from '../../Input'

// 树控件
function TreePicker(props) {
  const {
    multiple,
    list,
    defaultValue,
    value,
    keywordProps,
    // 节流时长
    throttle = 500,
    onChange,
    ...others
  } = props

  // 扁平化数据, 搜索时需要展开的子级
  let flattenListRef = useRef(
    Array.isArray(list) && list.length ? Object.clone(list).flattenTree() : []
  )
  useEffect(() => {
    // 第一次不走
    if (!flattenListRef.isFirst) {
      flattenListRef.isFirst = true
    }
    // 第二次开始更新
    else {
      if (Array.isArray(list) && list.length) {
        flattenListRef.current = Object.clone(list).flattenTree()
      }
    }

    // 展开关键字
    handleExpandedKeys()
  }, [list])

  // 展开的id
  const [expandedKeys, setExpandedKeys] = useState([])

  // 选中子级时自动展开父级, 但为设为自动true时无法收缩, 所以收缩时需要再设为false(expandedKeys如果带入了父级则不需要自动展开父级)
  // const [autoExpandParent, setAutoExpandParent] = useState(true) // autoExpandParent此属性会引发卡顿, 不建议使用
  const handleExpand = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys)
    // setAutoExpandParent(false)
  }

  // 搜索项属性
  const { visible: keywordVisible, value: keywordValue, ...otherKeywordProps } = keywordProps || {}
  let [keyword, setKeyword] = useState(keywordValue)
  function handleKeyword(newKeyword) {
    // 节流搜索
    if (flattenListRef.timeout) {
      window.clearTimeout(flattenListRef.timeout)
    }
    flattenListRef.timeout = window.setTimeout(() => {
      keyword = newKeyword
      setKeyword(newKeyword)
      handleExpandedKeys()
    }, throttle)
  }

  // 展开keys属性
  const expandProp = keywordVisible
    ? {
        // 点击展开(expandedKeys如果带入了父级则不需要自动展开父级)
        onExpand: handleExpand,
        // autoExpandParent: autoExpandParent,
        // 搜索时展开的子级
        expandedKeys: expandedKeys
      }
    : {}

  // 展开关键字
  function handleExpandedKeys() {
    // 没有关键字则没有展开项
    if (!keyword || Object.isEmptyObject(list)) {
      setExpandedKeys([])
    } else {
      // 展开的keys
      const newExpandedKeys = Utils.getExpandedKeys(keyword, flattenListRef.current)
      setExpandedKeys(newExpandedKeys)

      // setAutoExpandParent(true)
    }
  }

  // 构建渲染数据, 支持关键字搜索
  const treeData = Utils.getTreeData(list, keyword)

  // 构建选中项
  const checkedKeysProp = useMemo(() => {
    return Utils.getCheckedKeysProp(value, defaultValue)
  }, [value, defaultValue])

  return (
    <>
      {/* 搜索 */}
      {keywordVisible && (
        <Input.Text
          placeholder={locale('搜索', 'input_search_placeholder')}
          onChange={handleKeyword}
          className="treepicker-keyword-input"
          defaultValue={keyword}
          allowClear={true}
          {...otherKeywordProps}
        />
      )}
      {/* 树 */}
      <Tree
        fieldNames={{ key: 'id' }}
        treeData={treeData}
        multiple={multiple}
        // 选中项属性
        {...checkedKeysProp}
        // 选中checkbox
        onCheck={(ids, checkedObject) => {
          if (onChange) onChange(checkedObject?.checkedNodes || [])
        }}
        // 展开keys属性
        {...expandProp}
        {...others}
      ></Tree>
    </>
  )
}

export default TreePicker
