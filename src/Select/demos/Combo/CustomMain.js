import React from 'react'
import { Input } from 'seedsui-react'

// Main
const CustomMain = ({
  // Modal
  visible,

  // Main
  // MainComponent,
  // MainProps,

  // Main: common
  value,
  list,
  multiple,
  onSelect,
  onBeforeChange,
  onChange,

  // Main: render
  checkedType = 'checkbox', // 选中效果: checkbox | tick | corner
  checkedPosition = 'right', // 选中位置: left | right
  checkable,
  headerRender,
  footerRender,
  listRender,
  listHeaderRender,
  listFooterRender,
  listExtraHeaderRender,
  listExtraFooterRender,
  itemRender,
  itemContentRender,
  itemProps,
  checkboxProps,

  ...props
}) => {
  return (
    <>
      <div {...props} className={`picker-main${props?.className ? ' ' + props.className : ''}`}>
        <Input.Textarea placeholder="请输入打回原因" onChange={onChange} value={value} />
      </div>
    </>
  )
}

export default CustomMain
