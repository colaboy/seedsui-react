import React, { useState } from 'react'
import { DatePicker, DateUtil } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)

  console.log(DateUtil.diff(new Date('2021-10-26'), new Date(), 'year'))
  return (
    <>
      <DatePicker.Combo
        // style={{ height: 215, overflow: 'hidden', backgroundColor: 'white' }}
        // defaultPickerValue={new Date('2022-08-22 00:00')}
        min={new Date()}
        // year | quarter | month | date | time | datetime | week
        type="date"
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
        // displayValueFormatter={(value) => {
        //   let displayValue = ''
        //   if (value instanceof Date) {
        //     displayValue = DateUtil.format(value, 'YYYY-MM-DD HH:mm 第Q季 ddd')
        //   }
        //   return displayValue
        // }}
        ModalProps={{
          captionProps: {
            caption: ''
          }
        }}
      />
    </>
  )
}
