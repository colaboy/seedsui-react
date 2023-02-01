import React, { useState, useEffect } from 'react'
import { TreePicker, HighlightKeyword, Badge } from 'seedsui-react'
import treeData from './data.js'

export default () => {
  const [badge, setBadge] = useState(null)
  const [value, setValue] = useState([{ name: '和平区', parentid: '120000', id: '120101' }])
  useEffect(() => {
    setTimeout(() => {
      setBadge({
        '110000': 'asbc'
      })
    }, 2000)
  }, [])
  return (
    <>
      <TreePicker.Combo
        placeholder="Please select"
        value={value}
        list={treeData}
        multiple={true}
        checkStrictly={true}
        // checkable={false}
        TreeProps={{
          itemRender: (item, { keyword }) => {
            return (
              <div className="flex flex-middle">
                {item.isLeaf && (
                  <img
                    className="size36"
                    src="https://image-test.waiqin365.com/imobii_portal/images/icon/default-face-small.png"
                    alt=""
                    style={{ borderRadius: '100%', marginRight: '4px' }}
                  />
                )}
                <HighlightKeyword text={item.name} keyword={keyword} />
              </div>
            )
          },
          searchProps: {
            value: '东城',
            visible: true
          }
        }}
        onChange={(newValue) => {
          console.log('checked:', newValue)
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
                <Badge maxLength={3}>{badge[item.id]}</Badge>
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
