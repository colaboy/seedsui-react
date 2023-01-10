import React, { useEffect, useMemo, useState, useRef } from 'react'
import Tree from 'rc-tree'
import Input from '../../Input'

import Utils from './Utils'
import locale from './../../locale' // 国际化

// 树控件
function TreePicker({
  multiple,
  checkStrictly = false,
  checkable = true,

  // 根据checkable判断是否启用selectable, 没有checkbox时则启用
  selectable,

  list,
  defaultValue,
  value,
  searchProps,
  // 节流时长
  throttle = 500,
  onChange,

  // 树默认设置
  showIcon = false,

  // 自定义渲染
  itemRender,

  ...props
}) {
  // 扁平化数据, 搜索时需要展开的子级
  let flattenListRef = useRef(
    Array.isArray(list) && list.length ? Object.clone(list).flattenTree() : []
  )
  useEffect(() => {
    // 第一次不走
    if (!flattenListRef.current.isFirst) {
      flattenListRef.current.isFirst = true
    }
    // 第二次开始更新
    else {
      if (Array.isArray(list) && list.length) {
        flattenListRef.current = Object.clone(list).flattenTree()
      }
    }

    // 展开关键字
    handleExpandedKeys()
    // eslint-disable-next-line
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
  const {
    visible: searchVisible,
    value: searchValue,
    onSearch,
    ...otherSearchProps
  } = searchProps || {}

  // 搜索
  let [keyword, setKeyword] = useState(searchValue)
  function handleSearch(newKeyword) {
    keyword = newKeyword
    setKeyword(newKeyword)

    // 节流搜索
    if (window.timeout) {
      window.clearTimeout(window.timeout)
    }
    window.timeout = window.setTimeout(() => {
      handleExpandedKeys()
      if (onSearch) onSearch(keyword)
    }, throttle)
  }

  // 展开keys属性
  const expandProp = searchVisible
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

  // 修改
  function handleChange(ids, checkedObject) {
    if (!Array.isArray(ids) || !ids.length) {
      if (onChange) onChange([])
      return
    }
    let checkedNodes = checkedObject?.checkedNodes || []
    // 单选只选中当前项
    if (!multiple) {
      if (!checkedObject?.node) {
        checkedNodes = []
      }
      checkedNodes = checkedNodes.filter((checkedNode) => checkedNode.id === checkedObject?.node.id)
    }
    if (onChange) onChange(checkedNodes)
  }

  // 构建渲染数据, 支持关键字搜索
  const treeData = Utils.getTreeData({ list, keyword, itemRender })

  // 构建选中项
  const checkedKeysProp = useMemo(() => {
    return Utils.getCheckedKeysProp(value, defaultValue)
  }, [value, defaultValue])

  return (
    <>
      {/* 搜索 */}
      {searchVisible && (
        <Input.Text
          placeholder={locale('搜索', 'input_search_placeholder')}
          onChange={handleSearch}
          className="treepicker-search-input"
          defaultValue={keyword}
          allowClear={true}
          {...otherSearchProps}
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
        onCheck={handleChange}
        // 点击
        onSelect={handleChange}
        // 展开keys属性
        {...expandProp}
        // 树默认设置
        showIcon={showIcon}
        checkStrictly={checkStrictly}
        checkable={checkable}
        selectable={checkable ? false : true}
        {...props}
      ></Tree>
    </>
  )
}

export default TreePicker
