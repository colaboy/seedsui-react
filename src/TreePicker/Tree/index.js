import React, { forwardRef, useImperativeHandle, useEffect, useMemo, useState, useRef } from 'react'
import { getTreeData, getExpandedKeys, getCheckedKeysProp, getLoadedKeys } from './utils/index'

import Tree from 'rc-tree'

// 树控件
function TreePicker(
  {
    // multiple未传则为必选单选, multiple为false时为可取消单选
    multiple,
    // 精确检查节点，父子节点不关联
    checkStrictly = false,
    onlyLeafCheck,
    checkable = true,

    // 是否启用半选功能
    enableHalfChecked,

    // 保留上次选中值(取差量的值)
    preserveValue,

    // 根据checkable判断是否启用selectable, 没有checkbox时则启用
    selectable,

    list,
    defaultValue,
    value,
    // 节流时长
    throttle = 500,
    onChange,

    // 树默认设置
    showIcon = false,

    // 自定义渲染
    itemRender,

    ...props
  },
  ref
) {
  const treeRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      instance: treeRef.current,
      search: search
    }
  })

  // 扁平化数据, 搜索时需要展开的子级
  let flattenListRef = useRef(null)

  // 搜索关键字
  let keywordRef = useRef(null)

  // 树渲染数据
  const [treeData, setTreeData] = useState(null)

  // 展开的id
  const [expandedKeys, setExpandedKeys] = useState([])
  const expandedKeysRef = useRef([])

  // 异步已加载项(去掉小箭头项), 只有传入loadData时才生效
  let [loadedKeys, setLoadedKeys] = useState([])

  // 更新列表
  useEffect(() => {
    if (!Array.isArray(list) || !list.length) return

    // 更新平铺的列表, 搜索时使用
    flattenListRef.current = Object.clone(list).flattenTree()

    // 异步加载时需要判断哪些不需要再次加载(isLoaded)
    if (typeof props.loadData === 'function') {
      loadedKeys.push(...getLoadedKeys(flattenListRef.current))
      setLoadedKeys([...new Set(loadedKeys)])
    }

    // 更新渲染列表
    setTreeData(updateTreeData())
    // eslint-disable-next-line
  }, [list])

  // 展开关键字
  function search(keyword) {
    keywordRef.current = keyword
    // 没有关键字则没有展开项
    if (!keywordRef.current || Object.isEmptyObject(list)) {
      expandedKeysRef.current = []
      setExpandedKeys(expandedKeysRef.current)
    } else {
      // 展开的keys
      const newExpandedKeys = getExpandedKeys(keywordRef.current, flattenListRef.current)
      expandedKeysRef.current = newExpandedKeys
      setExpandedKeys(expandedKeysRef.current)
    }

    // 更新渲染列表
    setTreeData(updateTreeData())
  }

  // 获取树数据
  function updateTreeData() {
    return getTreeData({
      list,
      onlyLeafCheck,
      keyword: keywordRef.current || '',
      itemRender,
      onClick: (item) => {
        if (expandedKeysRef.current.includes(item.id)) {
          expandedKeysRef.current.splice(expandedKeysRef.current.indexOf(item.id), 1)
          setExpandedKeys([...expandedKeysRef.current])
        } else {
          expandedKeysRef.current = [item.id, ...(expandedKeysRef.current || [])]
          setExpandedKeys(expandedKeysRef.current)
        }
      }
    })
  }

  // 修改
  function handleChange(ids, checkedObject, ...e) {
    let checkedNodes = checkedObject?.checkedNodes || []
    // multiple未传则为必选单选
    if (multiple === undefined) {
      if (checkedObject?.node) checkedNodes = [checkedObject.node]
    }
    // multiple为false时为可取消单选
    else if (multiple === false) {
      if (checkedNodes.length > 1) {
        if (checkedObject?.node) checkedNodes = [checkedObject.node]
      }
    }
    // 多选
    else {
      // 启用半选
      if (
        enableHalfChecked &&
        Array.isArray(checkedObject.halfCheckedKeys) &&
        checkedObject.halfCheckedKeys.length
      ) {
        let halfCheckedNodes = []
        for (let item of flattenListRef.current) {
          if (checkedObject.halfCheckedKeys.includes(item.id)) {
            halfCheckedNodes.push({
              ...item,
              halfChecked: true
            })
          }
        }
        checkedNodes.push(...halfCheckedNodes)
      }
      // 保留上次选中值(取差量的值, 不存在列表中的值, 用于列表刷新后选中项没有了)
      if (preserveValue && Array.isArray(value) && value.length) {
        const difference = value.filter(
          (selectItem) => !flattenListRef.current.some((item) => item.id === selectItem.id)
        )
        checkedNodes.push(...difference)
      }
    }
    if (onChange) onChange(checkedNodes)
  }

  // 构建选中项
  const checkedKeysProp = useMemo(() => {
    // defaultCheckedKeys|checkedKeys: checkedKeys
    return getCheckedKeysProp(value, defaultValue)
  }, [value, defaultValue])

  // 异步加载时需要判断哪些不需要再次加载(isLoaded)
  const loadProp =
    typeof props.loadData === 'function'
      ? {
          loadedKeys: loadedKeys,
          onLoad: (newLoadedKeys) => {
            loadedKeys.push(...newLoadedKeys)
            // 异步加载会修改列表, 所以在列表监听处处理loadedKeys即可
          }
        }
      : {}

  if (!treeData) return null
  return (
    <>
      <Tree
        ref={treeRef}
        fieldNames={{ key: 'id' }}
        treeData={treeData}
        // 异步加载时需要判断哪些不需要再次加载
        {...loadProp}
        // 经测试multiple不生效
        // multiple={multiple}
        // 选中项属性
        {...checkedKeysProp}
        // 选中checkbox
        onCheck={handleChange}
        // 点击(用于解决checkable为false时没有checkbox时onChange)
        onSelect={handleChange}
        // 展开keys属性
        // 设置了expandedKeys, 就必须有配套的onExpand, 否则将不能再收缩了
        onExpand={(newExpandedKeys) => {
          setExpandedKeys(newExpandedKeys)
        }}
        // 搜索时展开的子级
        expandedKeys={expandedKeys}
        // 树默认设置
        showIcon={showIcon}
        onlyLeafCheck={onlyLeafCheck}
        checkStrictly={checkStrictly}
        checkable={checkable}
        selectable={checkable ? false : true}
        {...props}
      ></Tree>
    </>
  )
}

export default forwardRef(TreePicker)
