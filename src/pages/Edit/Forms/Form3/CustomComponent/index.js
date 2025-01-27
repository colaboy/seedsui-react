import React from 'react'
import locale from 'library/utils/locale'
import { options, getOption } from './options'
import Select from 'library/deprecated/Select'

import Dept from 'library/components/Dept'

// 特殊value
function CustomComponent({ value, onChange, onBeforeChange, ...props }) {
  // 修改radio
  function handleRadioChange(radioValue) {
    let radio = radioValue[0].id
    onChange &&
      onChange({
        radio: radio,
        dept: radio === '2' ? null : value?.dept
      })
  }

  // 修改部门
  function handleDeptChange(dept) {
    if (onChange) {
      onChange({
        dept: dept,
        ...value
      })
    }
  }

  return (
    <div>
      {/* 选项 */}
      <Select.Checkbox
        multiple={false}
        list={options}
        value={value?.radio ? [getOption(value?.radio)] : ''}
        onChange={handleRadioChange}
      />

      {/* 自定义校验1联动 */}
      {value?.radio === '1' && (
        <Dept.Combo
          placeholder={locale('选择部门', 'library.bb5feeb97bdb244e703635e38aeb3ee0')}
          value={value?.dept || null}
          onChange={handleDeptChange}
        />
      )}
    </div>
  )
}

export default CustomComponent
