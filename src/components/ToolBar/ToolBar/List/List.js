import React from 'react'

// 内库使用-start
import List from './../../../List'
// 内库使用-end

/* 测试使用-start
import { List } from 'seedsui-react'
测试使用-end */

function ListBar({ value, list, onChange }) {
  return (
    <List
      value={value}
      list={list}
      checkbox={() => <i className="toolbar-dropdown-list-item-checkbox"></i>}
      checkboxPosition="right"
      onChange={onChange}
    />
  )
}
export default ListBar
