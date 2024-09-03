import React, { forwardRef, useRef, useImperativeHandle, useState, Fragment } from 'react'
import { formatList } from './../utils'

import NoData from './../../NoData'
import List from './List'

// Main
const Main = forwardRef(
  (
    {
      // Modal
      visible,

      // Main
      // MainComponent,
      // MainProps,

      // Main: common
      value,
      list,
      multiple,
      allowClear,
      onSelect,
      onBeforeChange,
      onChange,
      onSearch,

      // Main: render
      checkedType = 'checkbox', // 选中效果: checkbox | tick | corner
      checkedPosition = 'right', // 选中位置: left | right
      checkable,
      headerRender,
      footerRender,
      listRender,
      listHeaderRender,
      listFooterRender,
      listExtraHeaderRender,
      listExtraFooterRender,
      itemRender,
      itemContentRender,
      itemProps,
      checkboxProps,

      ...props
    },
    ref
  ) => {
    // 搜索过滤
    const [keyword, setKeyword] = useState('')

    // 过滤非法数据
    // eslint-disable-next-line
    list = formatList(list, keyword, onSearch)

    // 节点
    const mainRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: mainRef.current,
        getRootDOM: () => mainRef.current,
        search: search
      }
    })

    // 展开关键字
    function search(keyword) {
      setKeyword(keyword)
    }

    // 渲染头部
    let HeaderNode = null
    if (typeof headerRender === 'function') {
      HeaderNode = headerRender({
        multiple,
        checkable,
        value,
        list: list,
        onChange: onChange
      })
    }
    // 渲染底部
    let FooterNode = null
    if (typeof footerRender === 'function') {
      FooterNode = footerRender({
        multiple,
        checkable,
        value,
        list: list,
        onChange: onChange
      })
    }

    return (
      <>
        {/* 头部 */}
        {HeaderNode}
        {/* 主体 */}
        <div
          {...props}
          className={`picker-main${props?.className ? ' ' + props.className : ''}`}
          ref={mainRef}
        >
          {Object.isEmptyObject(list) && <NoData />}
          {/* 列表上方扩展 */}
          {typeof listExtraHeaderRender === 'function' &&
            listExtraHeaderRender({
              multiple,
              checkable,
              value,
              list,
              onChange
            })}

          {/* 列表 */}
          <List
            value={value}
            list={list}
            multiple={multiple}
            onBeforeChange={onBeforeChange}
            onChange={onChange}
            // 选中效果: checkbox | tick | corner
            checkedType={checkedType}
            // 选中位置: left | right
            checkedPosition={checkedPosition}
            checkable={checkable}
            itemProps={itemProps}
          />

          {/* {list.map((item, index) => {
            // 子子元素
            if (Array.isArray(item.children)) {
              return (
                <Fragment key={item.id ?? index}>
                  <div className="select-group-headline">
                    <div className="select-group-caption">{item.name}</div>
                    {item.description && (
                      <div className="select-group-description">{item.description}</div>
                    )}
                  </div>
                  <div className="select-group-options">
                    {item.children.map((option, optionIndex) => {
                      return getItem(option, optionIndex)
                    })}
                  </div>
                </Fragment>
              )
            }
            // 子元素
            return getItem(item, index)
          })} */}

          {/* 列表下方扩展 */}
          {typeof listExtraFooterRender === 'function' &&
            listExtraFooterRender({
              multiple,
              checkable,
              value,
              list,
              onChange
            })}
        </div>
        {/* 底部 */}
        {FooterNode}
      </>
    )
  }
)

export default Main
