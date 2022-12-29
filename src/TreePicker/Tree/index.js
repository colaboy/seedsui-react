import React from 'react'
import Tree from 'rc-tree'

// 树控件
function TreePicker(props) {
  const { multiple, list, value, defaultValue, onChange, ...others } = props
  let val = value || defaultValue

  // 构建选中项
  let checkedKeys = []
  if (Array.isArray(val) && val.length) {
    for (let item of val) {
      if (item.id) {
        checkedKeys.push(item.id)
      }
    }
  }
  // value or defaultValue
  let valueProp = {}
  if (value) {
    valueProp = {
      checkedKeys: checkedKeys
    }
  } else if (defaultValue) {
    valueProp = {
      defaultCheckedKeys: checkedKeys
    }
  }
  return (
    <>
      <Tree
        fieldNames={{ title: 'name', key: 'id' }}
        treeData={list}
        multiple={multiple}
        {...valueProp}
        onCheck={(ids, checkedObject) => {
          if (onChange) onChange(checkedObject?.checkedNodes || [])
        }}
        {...others}
      ></Tree>
    </>
  )
}

export default TreePicker
