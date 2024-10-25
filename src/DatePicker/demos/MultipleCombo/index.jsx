import React, { useState } from 'react'
import { DatePicker, Toast } from 'seedsui-react'

export default () => {
  const [mulValue, setMulValue] = useState([
    {
      id: 'start',
      name: 'Start',
      value: null,
      disabled: true
    },
    {
      id: 'middle',
      name: 'Middle',
      value: null
    },
    {
      id: 'end',
      name: 'End',
      value: null
    }
  ])

  return (
    <>
      <DatePicker.MultipleCombo
        placeholder="Please select MultipleCombo"
        value={mulValue}
        type="week"
        onChange={(newValue) => {
          console.log(newValue)
          setMulValue(newValue)
        }}
        captionProps={{
          caption: '选择日期'
        }}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
        allowClear
        min={new Date()}
        onError={(err) =>
          Toast.show({
            content: err.errMsg || '',
            maskClickable: true
          })
        }
      />
    </>
  )
}
