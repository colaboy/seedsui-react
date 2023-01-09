import React, { useState, useEffect } from 'react'
import { TreePicker, Badge } from 'seedsui-react'
import treeData from 'seedsui-react/lib/PickerDistrict/china.js'

export default () => {
  const [badge, setBadge] = useState(null)
  const [value, setValue] = useState([{ name: '和平区', parentid: '120000', id: '120101' }])
  useEffect(() => {
    setTimeout(() => {
      setBadge({
        '110000': 800
      })
    }, 2000)
  }, [])
  return (
    <>
      <TreePicker.Combo
        placeholder="Please select"
        value={value}
        list={treeData}
        // multiple={true}
        checkStrictly={false}
        // checkable={false}
        TreeProps={{
          searchProps: {
            value: '东城',
            visible: true
          },
          showIcon: false
        }}
        onChange={(newValue) => {
          setValue(newValue)
        }}
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
        itemRender={(item, { keyword }) => {
          if (badge && badge[item.id]) {
            return (
              <div className="treepicker-menu-item-caption">
                {item.name}
                <Badge>{badge[item.id]}</Badge>
              </div>
            )
          }
          return false
        }}
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
