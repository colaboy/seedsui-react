import React, { useRef, useState, useEffect } from 'react'
import { DatePicker, LocaleUtil } from 'seedsui-react'

export default () => {
  const dateRef = useRef()
  const [value, setValue] = useState(new Date('2024-10-30'))

  useEffect(() => {
    LocaleUtil.setLocale('zh_CN')
    console.log(dateRef)
    dateRef?.current?.open?.()
  }, [])

  return (
    <>
      <DatePicker.Combo
        ref={dateRef}
        placeholder="Please select Combo"
        // style={{ height: 215, overflow: 'hidden', backgroundColor: 'white' }}
        // defaultPickerValue={new Date('2022-08-22 00:00')}
        min={new Date()}
        // max={new Date('2025-12-12')}
        // year | quarter | month | date | time | datetime | week
        type="week"
        hourStep={5}
        minuteStep={5}
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
        title="自定义"
      />
    </>
  )
}
