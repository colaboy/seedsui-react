import React, { useState, useEffect } from 'react'
import { TreePicker } from 'seedsui-react'
import treeData from 'seedsui-react/lib/PickerDistrict/china.js'

export default () => {
  const [list, setList] = useState(null)
  const [value, setValue] = useState([{ id: '110101' }])
  useEffect(() => {
    setTimeout(() => {
      setList(treeData)
    }, 1000)
  }, [])
  return (
    <>
      {/* <TreePicker.Combo
        placeholder="Please select"
        value={value}
        list={list}
        multiple={true}
        TreeProps={{
          keywordProps: {
            value: '东城',
            visible: true
          },
          showIcon: false,
          checkStrictly: false,
          checkable: true,
          selectable: false
        }}
        onChange={setValue}
      /> */}
      <TreePicker.Tree
        keywordProps={{
          value: '大东',
          visible: true
        }}
        value={value}
        multiple={true}
        list={treeData}
        showIcon={false}
        checkStrictly={false}
        checkable
        selectable={false}
        onChange={setValue}
      />
    </>
  )
}
