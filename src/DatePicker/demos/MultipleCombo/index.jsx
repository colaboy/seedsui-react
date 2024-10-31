import React, { useState } from 'react'
import { DatePicker, Toast } from 'seedsui-react'

export default () => {
  const [mulValue, setMulValue] = useState([
    {
      id: 'start',
      name: 'Start',
      value: new Date()
      // disabled: true
    },
    {
      id: 'middle',
      name: 'Middle',
      value: new Date()
    },
    {
      id: 'end',
      name: 'End',
      value: new Date()
    }
  ])

  return (
    <>
      <DatePicker.MultipleCombo
        placeholder="Please select MultipleCombo"
        // defaultPickerValue={mulValue}
        value={mulValue}
        // year | quarter | month | date | time | datetime | week
        type="month"
        onChange={(newValue) => {
          console.log(newValue)
          setMulValue(newValue)
        }}
        ModalProps={{
          captionProps: {
            caption: '选择日期'
          },
          onVisibleChange: (visible) => {
            console.log('visible:', visible)
          }
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
