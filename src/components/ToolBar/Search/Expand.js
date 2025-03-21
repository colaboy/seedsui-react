import React, { useState, useEffect, useRef } from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Input from './../../Input'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Input } from 'seedsui-react'
测试使用-end */

const Expand = ({ placeholder, value, onSearch, onBarCode, onCancel, barCode }) => {
  const rootRef = useRef(null)
  const [keyword, setKeyword] = useState(value)

  useEffect(() => {
    let inputDOM = rootRef.current.querySelector('[type=search]')
    inputDOM?.focus?.()
  }, [])

  return (
    <div ref={rootRef} className={`toolbar-search-expand`}>
      {/* 文本框 */}
      <form
        action="."
        className={`toolbar-search-form`}
        onSubmit={(e) => {
          e.preventDefault()
          let input = e.currentTarget.querySelector('.input-text')
          onSearch && onSearch(keyword)
          input && input.blur()
          e.stopPropagation()
        }}
      >
        <Input.Text
          className="toolbar-search-input"
          leftIcon={<i className="toolbar-search-input-left-icon" />}
          type="search"
          placeholder={placeholder || LocaleUtil.locale('搜索', 'SeedsUI_search')}
          allowClear
          value={keyword}
          onChange={setKeyword}
        />
      </form>

      {/* 二维码 */}
      {barCode && (
        <div className="toolbar-search-button-barcode" onClick={onBarCode}>
          <i className="toolbar-search-button-barcode-icon"></i>
        </div>
      )}

      {/* 取消按钮 */}
      <span
        className="toolbar-search-button-cancel"
        onClick={(e) => {
          onCancel && onCancel()
        }}
      >
        {LocaleUtil.locale('取消', 'SeedsUI_cancel')}
      </span>
    </div>
  )
}

export default Expand
