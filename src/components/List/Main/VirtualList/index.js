import React, { useRef, useMemo, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import List from './List'
import flattenList from './flattenList'
import getVisibleItems from './getVisibleItems'

// 内库使用-start
import Layout from './../../../Layout'
// 内库使用-end

/* 测试使用-start
import { Layout } from 'seedsui-react'
测试使用-end */

// 列表
const VirtualList = (
  {
    virtual,

    // Request
    onTopRefresh,
    onBottomRefresh,

    // Main: common
    allowClear,
    multiple,
    value,
    onChange,
    onScroll,

    // List config
    wrapper,
    layout,
    checkbox,
    checkboxPosition,

    // Render
    prepend,
    list,
    append,

    children,
    ...props
  },
  ref
) => {
  const rootRef = useRef(null)
  const listRef = useRef(null)

  // 拉平数据, And set virtualData.type
  const items = useMemo(() => flattenList(list), [list])

  // 计算每一项的高度并缓存
  const itemHeights = useMemo(() => {
    if (Array.isArray(items) && items.length) {
      return items.map(virtual.getItemHeight)
    }
    return []
  }, [list])

  // 计算总高度
  const totalHeight = itemHeights.reduce((sum, h) => sum + h, 0)

  // Visible Items and set virtualData style
  const [visibleItems, setVisibleItems] = useState(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      ...rootRef.current,
      getAnchors: () => {
        if (!Array.isArray(items) || !items.length) return []
        let anchorsMap = {}
        let anchors = []
        for (let item of items) {
          if (item.anchor) {
            if (!anchorsMap[item.anchor]) anchors.push(item.anchor)
            anchorsMap[item.anchor] = 1
          }
        }
        return anchors
      },
      scrollToAnchor: (anchor) => {
        for (let item of items) {
          if (item.anchor === anchor) {
            if (typeof item?.virtualData.top === 'number') {
              rootRef.current.rootDOM.scrollTop = item?.virtualData.top
              return
            }
          }
        }
      }
    }
  })

  // 初始化完成时更新显示容器
  useEffect(() => {
    if (Array.isArray(list) && list.length) {
      updateVisibleItems()
    }
  }, [list])

  // 更新显示容器
  function updateVisibleItems() {
    if (!rootRef.current?.rootDOM) return
    let prependHeight = listRef.current?.offsetTop
    requestAnimationFrame(() => {
      let newVisibleItems = getVisibleItems({
        prependHeight: prependHeight || 0,
        items,
        itemHeights,
        scrollTop: rootRef.current?.rootDOM?.scrollTop,
        containerHeight: rootRef.current?.rootDOM?.clientHeight || 0
      })
      setVisibleItems(newVisibleItems)
    })
  }

  // 滚动
  function handleScroll(e) {
    // Set visible items and set virtualData
    updateVisibleItems()
    onScroll && onScroll(e)
  }

  return (
    <Layout.Main
      {...props}
      ref={rootRef}
      className={`list-main${props.className ? ' ' + props.className : ''}`}
      onTopRefresh={onTopRefresh}
      onBottomRefresh={onBottomRefresh}
      onScroll={handleScroll}
    >
      {/* 头部 */}
      {typeof prepend === 'function' ? prepend({ list, value, onChange }) : null}

      {/* 列表 */}
      <List
        ref={listRef}
        allowClear={allowClear}
        multiple={multiple}
        value={value}
        list={visibleItems}
        onChange={onChange}
        // List config
        wrapper={wrapper}
        layout={layout}
        checkbox={checkbox}
        checkboxPosition={checkboxPosition}
        // virtual config
        height={totalHeight}
      />

      {/* 底部 */}
      {typeof append === 'function' ? append({ list, value, onChange }) : null}

      {/* 其它公共的提示信息 */}
      {children}
    </Layout.Main>
  )
}

export default forwardRef(VirtualList)
