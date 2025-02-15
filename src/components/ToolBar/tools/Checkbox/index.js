import React from 'react'
import Checkbox from 'library/deprecated/Checkbox'

// 复选框
import DB from 'library/deprecated/DB'
function CheckboxCommponet({
  type,
  name,
  value,
  // 非选中和选中的值
  values,
  // 记住上次选中项
  reserve,
  // 事件
  onBeforeChange,
  onChange,
  ...props
}) {
  // 非选中和选中的值
  let unCheckedValue = null
  let checkedValue = null
  if (Array.isArray(values) && values.length === 2) {
    unCheckedValue = values[0]
    checkedValue = values[1]
  }

  // 是否选中
  let checked = value !== undefined && value === checkedValue

  async function handleChecked(newChecked) {
    // 对应的值
    let newValue = ''
    if (newChecked) {
      newValue = checkedValue ?? '1'
    } else {
      newValue = unCheckedValue ?? '0'
    }

    if (typeof onBeforeChange === 'function') {
      let goOn = await onBeforeChange(newValue)
      if (!goOn) return
    }

    if (reserve) {
      DB.setStore(reserve, newValue)
    }
    onChange && onChange(newValue)
  }

  return (
    <Checkbox checked={checked} style={{ marginLeft: '10px' }} onChange={handleChecked} {...props}>
      {name}
    </Checkbox>
  )
}
export default CheckboxCommponet
