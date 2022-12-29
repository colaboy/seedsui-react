import React, { useState } from 'react'
import { TreePicker } from 'seedsui-react'
import treeData from 'seedsui-react/lib/PickerDistrict/china.js'

export default () => {
  const [value, setValue] = useState([{ id: '110101' }])
  return (
    <>
      <TreePicker.Combo
        placeholder="Please select"
        value={value}
        list={treeData}
        multiple={true}
        TreeProps={{
          showIcon: false,
          checkStrictly: false,
          checkable: true,
          selectable: false
        }}
        onChange={setValue}
      />
      <TreePicker.Tree
        value={value}
        multiple={true}
        treeData={treeData}
        showIcon={false}
        checkStrictly={false}
        checkable
        selectable={false}
        onChange={setValue}
      />
    </>
  )
}
