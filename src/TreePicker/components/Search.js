import React from 'react'
import Input from './../../Input'
import locale from './../../locale' // 国际化

// 搜索框
const Search = ({
  value,
  onChange,

  // 搜索
  searchProps,

  // 节流时长
  throttle = 500,

  // 自定义渲染
  searchRender
}) => {
  // 搜索项属性
  const {
    visible: searchVisible,
    value: searchValue,
    onSearch,
    ...otherSearchProps
  } = searchProps || {}

  function handleChange(newKeyword) {
    // 节流搜索
    if (window.timeout) {
      window.clearTimeout(window.timeout)
    }
    window.timeout = window.setTimeout(() => {
      if (onChange) onChange(newKeyword)
      if (onSearch) onSearch(newKeyword)
    }, throttle)
  }

  // 不显示则不渲染
  if (!searchVisible) return null

  // 自定义渲染
  if (typeof searchRender === 'function') {
    let searchNode = searchRender({
      value,
      onChange,

      // 搜索
      searchProps,

      // 节流时长
      throttle
    })
    if (searchNode) return searchNode
  }

  return (
    <>
      {/* 搜索 */}
      {searchVisible && (
        <Input.Text
          placeholder={locale('搜索', 'input_search_placeholder')}
          onChange={handleChange}
          className="treepicker-search-input"
          defaultValue={value}
          allowClear={true}
          {...otherSearchProps}
        />
      )}
    </>
  )
}

export default Search
