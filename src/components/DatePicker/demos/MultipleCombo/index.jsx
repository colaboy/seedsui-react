import React, { useState } from 'react'
import { DatePicker, Toast } from 'seedsui-react'

export default () => {
  const [mulValue, setMulValue] = useState([
    {
      id: 'start',
      description: 'Start',
      value: new Date()
      // disabled: true
    },
    {
      id: 'middle',
      description: 'Middle',
      value: new Date()
    },
    {
      id: 'end',
      description: 'End',
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
        type="datetime"
        onChange={(newValue) => {
          console.log(newValue)
          setMulValue(newValue)
        }}
        modalProps={{
          captionProps: {
            caption: '选择日期'
          },
          onVisibleChange: (visible) => {
            console.log('visible:', visible)
          }
        }}
        allowClear
        min={new Date()}
        hourStep={5}
        minuteStep={5}
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
