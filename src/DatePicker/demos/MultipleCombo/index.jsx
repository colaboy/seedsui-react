import React, { useState } from 'react'
import { DatePicker, Toast } from 'seedsui-react'

export default () => {
  const [mulValue, setMulValue] = useState([
    {
      type: 'date',
      id: 'start',
      name: 'Start',
      value: null,
      defaultPickerValue: new Date('2022-08-22 00:00')
    },
    {
      type: 'date',
      id: 'middle',
      name: 'Middle',
      value: null,
      defaultPickerValue: new Date('2023-08-22 00:00')
    },
    {
      type: 'date',
      id: 'end',
      name: 'End',
      value: null,
      defaultPickerValue: new Date('2024-08-22 00:00')
    }
  ])

  return (
    <>
      <DatePicker.MultipleCombo
        placeholder="Please select MultipleCombo"
        value={mulValue}
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
