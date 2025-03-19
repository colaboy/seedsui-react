import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Input from './../../../Input'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Input } from 'seedsui-react'
测试使用-end */

const PlaceholderInput = ({ placeholder, value, onExpand, onBarCode, barCode, inputProps }) => {
  return (
    <>
      {/* 文本框 */}
      <div className={`toolbar-search-form`}>
        <Input.Text
          className="toolbar-search-input"
          leftIcon={<i className="toolbar-search-input-left-icon" />}
          type="search"
          placeholder={placeholder || LocaleUtil.locale('搜索', 'SeedsUI_search')}
          allowClear={false}
          value={value}
          readOnly
          onClick={onExpand}
          {...inputProps}
        />
      </div>

      {/* 二维码 */}
      {barCode && (
        <div className="toolbar-search-button-barcode" onClick={onBarCode}>
          <i className="toolbar-search-button-barcode-icon"></i>
        </div>
      )}
    </>
  )
}

export default PlaceholderInput
