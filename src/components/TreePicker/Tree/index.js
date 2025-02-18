import React, { forwardRef, useImperativeHandle, useEffect, useMemo, useState, useRef } from 'react'
import _ from 'lodash'
import {
  getTreeData,
  getAllExpandedKeys,
  getExpandedKeys,
  getCheckedKeysProp,
  getLoadedKeys,
  filterValue
} from './utils/index'

import Tree from 'rc-tree'

// 内库使用-start
import ArrayUtil from '../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { ArrayUtil } from 'seedsui-react'
测试使用-end */

// 树控件
function TreePicker(
  {
    // Modal
    visible = true,

    // Main: common
    list,
    allowClear,
    multiple,
    value,
    onChange,
    onSelect,

    // 级联 true: 不级联, false: 级联, children: 子级不级联父级
    checkStrictly = false,
    // 定义选中项回填的方式: leaf仅显示所有末级节点; parent仅显示父级节点, 默认无
    showCheckedStrategy,
    // 是否启用半选功能
    enableHalfChecked,
    // 保留不在树结构中的value
    preserveValue,
    // 仅允许选中末级节点: true|false|(item) => true|false
    onlyLeafCheck,
    // 是否显示checkbox
    checkable = true,
    // 默认展开
    defaultExpandAll,
    // 动态加载数据
    loadData,
    TreeProps,

    // 自定义渲染
    itemRender,
    ...props
  },
  ref
) {
  const mainRef = useRef(null)
  const treeRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      mainDOM: mainRef.current,
      getMainDOM: () => mainRef.current,
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
  let [expandedKeys, setExpandedKeys] = useState([])
  const expandedKeysRef = useRef(expandedKeys)

  // treeData的所有数据为isLoaded=true认为是已加载项，抽取到loadedKeys
  // 已加载项用于: 1.阻止rc-tree触发已加载的节点触发loadData 2.rc-tree将会判断叶子节点，并且已加载则不显示箭头
  let [loadedKeys, setLoadedKeys] = useState([])

  // 更新列表
  useEffect(() => {
    if (!Array.isArray(list) || !list.length) return

    // 更新平铺的列表, 搜索时使用
    flattenListRef.current = ArrayUtil.flattenTree(list)

    // 默认全部展开
    if (defaultExpandAll) {
      expandedKeysRef.current = getAllExpandedKeys(list)
      setExpandedKeys(expandedKeysRef.current)
    }

    // 异步加载时需要判断哪些不需要再次加载(isLoaded)
    if (typeof loadData === 'function') {
      let newLoadedKeys = [...new Set(getLoadedKeys(list))]

      // 展开项必须为isLoaded项
      let newExpandedKeys = []
      for (let key of expandedKeys) {
        if (newLoadedKeys.includes(key)) {
          newExpandedKeys.push(key)
        }
      }

      // eslint-disable-next-line
      loadedKeys = newLoadedKeys
      // eslint-disable-next-line
      expandedKeys = newExpandedKeys
      setLoadedKeys(newLoadedKeys)
      setExpandedKeys(newExpandedKeys)
    }

    // 更新渲染列表
    setTreeData(updateTreeData())
    // eslint-disable-next-line
  }, [list])

  // 展开关键字
  function search(keyword) {
    keywordRef.current = keyword
    // 没有关键字则没有展开项
    if (!keywordRef.current || _.isEmpty(list)) {
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

  // 获取更新后的树数据
  function updateTreeData() {
    return getTreeData({
      // 异步加载需要传入加载完成的节点，用于判断是否有子节点
      loadedKeys: typeof loadData === 'function' ? loadedKeys : null,
      list,
      onlyLeafCheck,
      keyword: keywordRef.current || '',
      itemRender,
      // 用于点击展开和收缩，点击阻止选中，计算展开和收缩项, rc-tree-title宽度即阻止选中的区域大小
      onClick: (item) => {
        // 触发onSelect
        typeof onSelect === 'function' && onSelect(item)

        // 设置展开和收缩项的keys
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
  function handleChange(ids, checkedObject) {
    let checkedNodes = checkedObject?.checkedNodes || []
    // 单选
    if (!multiple) {
      // 允许清空
      if (allowClear) {
        if (checkedNodes.length > 1) {
          if (checkedObject?.node) checkedNodes = [checkedObject.node]
        }
      }
      // 不允许清空
      else {
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
      // 保留不在树结构中的value
      if (preserveValue && Array.isArray(value) && value.length) {
        const difference = value.filter(
          (selectItem) => !flattenListRef.current.some((item) => item.id === selectItem.id)
        )
        checkedNodes.push(...difference)
      }
    }

    // 只级联子级
    if (checkStrictly === 'children' && checkedObject?.node?.id) {
      const descendants =
        ArrayUtil.getFlatTreeDescendantNodes(
          flattenListRef.current,
          checkedObject?.node?.id ?? ''
        ) || []

      const checked = {}
      const unchecked = {}
      for (let i = 0; i < descendants.length; i++) {
        const descendant = descendants[i]
        // 如果选中项里已经存在此项
        if (checkedNodes.some((checkedNode) => descendant.id === checkedNode.id)) {
          checked[descendant.id] = descendant
        }
        // 不存在的项
        else {
          unchecked[descendant.id] = descendant
        }
      }

      // 选中, 将树中选中项, 在值中没有的项加到值中
      if (checkedObject?.node?.checked === false) {
        checkedNodes.push(...Object.values(unchecked))
      }
      // 取消选中, 将树中选中项, 将值中存在的选中项清除
      else {
        let checkedIds = Object.keys(checked)
        checkedNodes = checkedNodes.filter(
          (item) => !checkedIds.some((checkedId) => checkedId === item.id)
        )
      }
    }

    // 定义选中项回填的方式
    if (showCheckedStrategy) {
      checkedNodes = filterValue(checkedNodes, showCheckedStrategy)
    }
    if (onChange) onChange(checkedNodes)
  }

  // 构建选中项
  const checkedKeysProp = useMemo(() => {
    // checkedKeys: checkedKeys
    return getCheckedKeysProp(value)
  }, [value])

  // 异步加载时需要判断哪些不需要再次加载(isLoaded)
  const loadProp =
    typeof loadData === 'function'
      ? {
          loadedKeys: loadedKeys,
          onLoad: (newLoadedKeys) => {
            console.log('onLoad')
            loadedKeys.push(...newLoadedKeys)
            // 异步加载会修改列表, 所以在列表监听处处理loadedKeys即可
          }
        }
      : {}

  if (!treeData) return null

  return (
    <div
      {...props}
      className={`treepicker-tree${props.className ? ' ' + props.className : ''}`}
      ref={mainRef}
    >
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
        // 展开keys属性
        // 设置了expandedKeys, 就必须有配套的onExpand, 否则将不能再收缩了
        onExpand={(newExpandedKeys) => {
          setExpandedKeys(newExpandedKeys)
        }}
        // 搜索时展开的子级
        expandedKeys={expandedKeys}
        // 树默认设置
        showIcon={false}
        checkStrictly={checkStrictly === false ? false : true}
        checkable={checkable}
        selectable={checkable ? false : true}
        loadData={loadData}
        {...(TreeProps || {})}
      ></Tree>
    </div>
  )
}

export default forwardRef(TreePicker)
