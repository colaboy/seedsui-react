import React, { useImperativeHandle, forwardRef, useRef, useEffect, useState } from 'react'
import memoRerender from './memoRerender'
import getAnchorMap from './getAnchorMap'
import hasChildren from './hasChildren'
import ScrollerContainer from './Scroller'
import Item from './../../Item'
import GroupList from './GroupList'
import List from './List'

// 列表
const VirtualList = forwardRef(
  (
    {
      // Main: common
      allowClear,
      multiple,
      value,
      onChange,
      onTopRefresh,
      onBottomRefresh,
      onScroll,
      // 请求属性
      pagination, // {totalPages: 10, totalItems: 100, rows: 100}

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
    // 分组时的锚点索引: {A: 100, B: 300}
    const anchorMap = useRef({})
    // 容器
    const rootRef = useRef(null)
    // Expose
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.rootDOM,
        getRootDOM: rootRef?.current?.getRootDOM,
        getAnchors: () => {
          return Object.keys(anchorMap.current)
        },
        scrollToAnchor: (anchor) => {
          rootRef.current.scrollToIndex(anchorMap.current[anchor])
        }
      }
    })

    console.log(rootRef)

    // 自定义滚动容器（监听下拉手势）
    const Scroller = React.forwardRef(({ style, children, ...scrollerProps }, ref) => {
      // rootRef.current = ref.current
      return (
        <ScrollerContainer
          {...props}
          style={{ ...style, ...props?.style }}
          ref={ref}
          {...scrollerProps}
          className={`list-main${props.className ? ' ' + props.className : ''}`}
          onTopRefresh={onTopRefresh}
          onBottomRefresh={onBottomRefresh}
          onScroll={onScroll}
        >
          {children}
        </ScrollerContainer>
      )
    })

    // 单项渲染
    function itemContent(index, item) {
      return (
        <>
          {/* 头部 */}
          {index === 0 && typeof prepend === 'function'
            ? prepend({ list, value, onChange, pagination })
            : null}
          <Item
            key={item.id ?? index}
            // Custom Wrapper or Item
            wrapper={wrapper}
            // Display Item
            title={item.name}
            // Other Item
            {...item}
            // Item Data
            itemData={item}
            // Global Config
            layout={layout}
            checkbox={item.checkbox || checkbox}
            checkboxPosition={item.checkboxPosition || checkboxPosition}
            checked={value?.findIndex?.((valueItem) => valueItem?.id === item.id) >= 0}
            onChange={(checked) => {
              let newValue = null
              // 多选
              if (multiple) {
                if (!checked) {
                  newValue = value.filter((valueItem) => valueItem?.id !== item.id)
                } else {
                  newValue = [...(value || []), item]
                }
              }
              // 单选
              else {
                if (!checked) {
                  allowClear ? (newValue = null) : (newValue = [item])
                } else {
                  newValue = [item]
                }
              }
              onChange && onChange(newValue, { checked: checked, item: item })
            }}
          />
        </>
      )
    }

    function getList() {
      if (!Array.isArray(list) || !list.length) return null

      if (hasChildren(list)) {
        anchorMap.current = getAnchorMap(list)

        return (
          <GroupList
            ref={rootRef}
            list={list}
            itemContent={itemContent}
            Scroller={Scroller}
            Footer={() => {
              return typeof append === 'function'
                ? append({ list, value, onChange, pagination })
                : null
            }}
          />
        )
      }

      console.log('2')
      console.log(list)
      return <div>2</div>
      // return <List list={list} itemContent={itemContent} Scroller={Scroller} />
    }

    return getList()
  }
)

export default React.memo(VirtualList, memoRerender)
