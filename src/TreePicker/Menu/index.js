// require PrototypeArray.js
import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react'
import Input from './../../Input'
import Tree from './Tree'
import locale from './../../locale' // 国际化

// 树菜单选择
const Menu = forwardRef(
  (
    {
      value = [], // 选中项: [{id: '', name: ''}]
      list = [], // 数据: [{id: '', name: '', parentid: ''}]

      onChange, // func(value)

      // 搜索
      searchProps,

      // 节流时长
      throttle = 500,

      // 自定义渲染
      itemRender,

      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.current,
        getRootDOM: () => rootRef?.current?.current
      }
    })

    // 搜索项属性
    const { visible: searchVisible, value: searchValue, ...otherSearchProps } = searchProps || {}
    let [keyword, setKeyword] = useState(searchValue)
    function handleSearch(newKeyword) {
      // 节流搜索
      if (window.timeout) {
        window.clearTimeout(window.timeout)
      }
      window.timeout = window.setTimeout(() => {
        keyword = newKeyword
        setKeyword(newKeyword)
      }, throttle)
    }

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
          ref={rootRef}
          itemRender={itemRender}
          keyword={keyword}
          value={value}
          list={list}
          onChange={onChange}
          {...props}
        />
      </>
    )
  }
)

export default Menu
