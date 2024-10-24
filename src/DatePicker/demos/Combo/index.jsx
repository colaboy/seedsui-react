import React, { useState } from 'react'
import { DatePicker, Toast } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)

  return (
    <>
      <DatePicker.Combo
        // style={{ height: 215, overflow: 'hidden', backgroundColor: 'white' }}
        defaultPickerValue={new Date('2022-08-22 00:00')}
        // min={new Date()}
        // year | quarter | month | date | time | datetime
        type="week"
        // format="YYYY-MM-DD HH:mm 第Q季 ddd"
        value={value}
        onBeforeChange={(newValue) => {
          console.log('修改前:', newValue)
        }}
        onChange={(newValue) => {
          console.log('修改:', newValue)
          setValue(newValue)
        }}
        allowClear
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
        onError={(error) => {
          console.log(error)
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
