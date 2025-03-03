import React, { useMemo, forwardRef } from 'react'
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
const Main = forwardRef(
  (
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
    // 拉平数据, And set virtualData.type
    const items = useMemo(() => flattenList(list), [list])

    // 计算每一项的高度并缓存
    const itemHeights = useMemo(() => items.map(getItemHeight), [list])

    // 计算总高度
    const totalHeight = itemHeights.reduce((sum, h) => sum + h, 0)

    // Visible Items and set virtualData style
    const [visibleItems, setVisibleItems] = useState(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        ...ref.current,
        getAnchors: () => {
          let anchors = []
          for (let item of items) {
            if (item.anchor) {
              anchors.push(item.anchor)
            }
          }
          return anchors
        },
        scrollToAnchor: (anchor) => {
          for (let item of items) {
            if (item.anchor === anchor) {
              ref.rootDOM.scrollTop = items[index]?.top
              return
            }
          }
        }
      }
    })

    // 滚动
    function handleScroll(e) {
      // Set visible items and set virtualData
      requestAnimationFrame(() => {
        let newVisibleItems = getVisibleItems({
          items,
          itemHeights,
          scrollTop: e.currentTarget.scrollTop,
          containerHeight: containerRef.current?.clientHeight || 0
        })
        setVisibleItems(newVisibleItems)
      })
      onScroll && onScroll(e)
    }

    return (
      <Layout.Main
        {...props}
        ref={ref}
        className={`list-main${props.className ? ' ' + props.className : ''}`}
        onTopRefresh={onTopRefresh}
        onBottomRefresh={onBottomRefresh}
        onScroll={handleScroll}
      >
        {/* 头部 */}
        {typeof prepend === 'function' ? prepend({ list, value, onChange }) : null}

        {/* 列表 */}
        {Array.isArray(list) && list.length && (
          <List
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
        )}

        {/* 底部 */}
        {typeof append === 'function' ? append({ list, value, onChange }) : null}

        {/* 其它公共的提示信息 */}
        {children}
      </Layout.Main>
    )
  }
)

export default Main
