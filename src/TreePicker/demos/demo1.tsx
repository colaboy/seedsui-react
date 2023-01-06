import React, { useState, useEffect } from 'react'
import { TreePicker } from 'seedsui-react'
import treeData from 'seedsui-react/lib/PickerDistrict/china.js'

export default () => {
  const [list, setList] = useState(null)
  const [value, setValue] = useState([{ name: '和平区', parentid: '120000', id: '120101' }])
  useEffect(() => {
    setTimeout(() => {
      setList(treeData)
    }, 1000)
  }, [])
  return (
    <>
      <TreePicker.Combo
        placeholder="Please select"
        value={value}
        list={list}
        multiple={true}
        TreeProps={{
          searchProps: {
            value: '东城',
            visible: true
          },
          showIcon: false,
          checkStrictly: false,
          checkable: true,
          selectable: false
        }}
        onChange={setValue}
        ModalProps={{
          onVisibleChange: (visible) => {
            // debugger
          }
        }}
      />
      <TreePicker.Menu
        // searchProps={{
        //   value: '大东',
        //   visible: true
        // }}
        value={value}
        multiple={true}
        list={treeData}
        onChange={(newValue) => {
          console.log(newValue)
          setValue(newValue)
        }}
        onExpand={(newValue) => {
          console.log('onExpand:', newValue)
        }}
        onCollapse={(newValue) => {
          console.log('onCollapse:', newValue)
        }}
      />
    </>
  )
}
