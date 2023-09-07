import React, { useState } from 'react'
import { DatePicker, Toast } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)

  return (
    <>
      <DatePicker.Combo
        placeholder="Please select"
        defaultPickerValue={new Date('2022-08-22 00:00')}
        min={new Date()}
        type="datetime"
        value={value}
        onChange={setValue}
        // captionProps={{
        //   caption: '选择日期'
        // }}
        allowClear
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
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
