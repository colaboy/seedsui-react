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
        allowClear
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
        // displayValueFormatter={({ value, type }) => {
        //   let displayValue = ''
        //   if (Object.isDate(value)) {
        //     displayValue = value.format('YYYY-MM')
        //   }
        //   return displayValue
        // }}
        // captionProps={{
        //   caption: ''
        // }}
        // titleFormatter={({ type, value }) => {
        //   console.log('格式化标题:', type, value)
        //   if (value.getDate() === 1) {
        //     return 'YYYY-MM'
        //   }
        //   return 'YYYY-MM-DD'
        // }}
        // onError={(err) =>
        //   Toast.show({
        //     content: err.errMsg || '',
        //     maskClickable: true
        //   })
        // }
      />
    </>
  )
}
