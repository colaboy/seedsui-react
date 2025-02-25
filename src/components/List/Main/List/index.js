import React, { forwardRef } from 'react'
import List from './../../List'

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
    return (
      <Layout.Main
        {...props}
        ref={ref}
        className={`list-main${props.className ? ' ' + props.className : ''}`}
        onTopRefresh={onTopRefresh}
        onBottomRefresh={onBottomRefresh}
        onScroll={onScroll}
      >
        {/* 头部 */}
        {typeof prepend === 'function' ? prepend({ list, value, onChange, pagination }) : null}

        {/* 列表 */}
        {Array.isArray(list) && list.length && (
          <List
            allowClear={allowClear}
            multiple={multiple}
            value={value}
            list={list}
            onChange={onChange}
            // List config
            wrapper={wrapper}
            layout={layout}
            checkbox={checkbox}
            checkboxPosition={checkboxPosition}
          />
        )}

        {/* 底部 */}
        {typeof append === 'function' ? append({ list, value, onChange, pagination }) : null}

        {/* 其它公共的提示信息 */}
        {children}
      </Layout.Main>
    )
  }
)

export default Main
