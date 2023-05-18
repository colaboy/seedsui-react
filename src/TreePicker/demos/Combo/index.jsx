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
        multiple={true}
        captionProps={{
          caption: 'aaa'
        }}
        itemRender={(item, { keyword }) => {
          return (
            <div className="flex flex-middle">
              {item?.isDistrict && (
                <img
                  className="size36"
                  src={`${
                    item?.props?.avatar ||
                    'https://image-test.waiqin365.com/imobii_portal/images/icon/default-face-small.png'
                  }`}
                  alt=""
                  style={{ borderRadius: '100%', marginRight: '4px' }}
                />
              )}
              <HighlightKeyword text={item.name} keyword={keyword} />
            </div>
          )
        }}
        // 保留不在树结构中的value
        // preserveValue
        // 仅允许选中末级节点
        // onlyLeafCheck={true}
        // 级联 true: 不级联, false: 级联, children: 只级联子级
        // checkStrictly={'children'}
        // 启用半选功能
        enableHalfChecked
        checkable={true}
        onSelect={(item) => {
          console.log('select:', item)
        }}
        onChange={(newValue) => {
          console.log('checked:', newValue)
          setValue(newValue)
        }}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
      />
    </>
  )
}
