import React, { forwardRef, useRef, useImperativeHandle, useState, Fragment } from 'react'
import { formatList } from './../utils'
import isChecked from './isChecked'
import addItem from './addItem'

import NoData from './../../NoData'
import Item from './Item'

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

    // 获取单项
    function getItem(item, index) {
      return (
        <Item
          key={item.id || index}
          item={item}
          index={index}
          // 选中效果: checkbox | tick | corner
          checkedType={checkedType}
          // 选中位置: left | right
          checkedPosition={checkedPosition}
          {...itemProps}
          disabled={item.disabled}
          checked={isChecked(item, value)}
          checkable={checkable}
          onClick={async (e) => {
            let newValue = addItem(item, value, multiple)
            if (typeof onBeforeChange === 'function') {
              let goOn = await onBeforeChange(newValue)
              if (goOn === false) return
            }
            onChange && onChange(newValue)
          }}
        />
      )
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
          {list.map((item, index) => {
            // 子子元素
            if (Array.isArray(item.children)) {
              return (
                <Fragment key={item.id || index}>
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
          })}

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
