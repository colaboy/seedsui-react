import React, { useState } from 'react'
import { TreePicker, HighlightKeyword } from 'seedsui-react'
import treeData from './../data.js'

export default () => {
  const [value, setValue] = useState(null)
  return (
    <>
      <TreePicker.Combo
        placeholder="Please select"
        value={value}
        list={treeData}
        multiple={false}
        // checkStrictly={true}
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
    </>
  )
}
