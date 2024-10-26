import React, { useEffect, useRef, useState } from 'react'
import { DatePicker, locale } from 'seedsui-react'

export default () => {
  const date1Ref = useRef(null)
  const date2Ref = useRef(null)
  const [value, setValue] = useState([new Date('2022-08-22'), null])
  const [icon, setIcon] = useState('1')

  useEffect(() => {
    date1Ref.current.open()
  }, [])

  return (
    <>
      <DatePicker.RangeCombo
        ref={date1Ref}
        ranges={{
          自定义: 100
        }}
        // disabledStart
        // disabledEnd
        className="border-b"
        placeholder="Please select RangeCombo"
        type="datetime"
        min={new Date()}
        // max={new Date()}
        onError={(error) => {
          console.log(error)
        }}
        // maskClosable={false}
        onBeforeOpen={() => {
          if (document.querySelector('.mask.active')) {
            date1Ref.current.close()
            date2Ref.current.close()
            return false
          }
          return true
        }}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
        ModalProps={{
          maskProps: {
            style: {
              zIndex: 999
            }
          }
        }}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        value={value}
        defaultPickerValue={[new Date('2022-08-22 00:00'), new Date('2022-09-22 12:12')]}
        captionProps={{
          caption: '选择日期'
        }}
      />
      <DatePicker.RangeCombo
        ref={date2Ref}
        modal="picker"
        type="week"
        // disabledStart
        // disabledEnd
        onVisibleChange={(visible) => {
          console.log('visible2:', visible)
          if (visible) {
            setIcon('2')
          } else {
            setIcon('1')
          }
        }}
        ModalProps={{
          maskProps: {
            style: {
              zIndex: 999
            }
          }
        }}
        // 自定义渲染
        comboRender={({ displayValue }) => {
          return icon + displayValue
        }}
        captionProps={{
          caption: '选择日期'
        }}
        // Main props
        titles={{
          custom: '自定义选择',
          selector: '快捷选择'
        }}
        ranges={{
          [locale('今日')]: [new Date(), new Date()],
          [locale('今天')]: [new Date(), new Date()],
          [locale('昨日')]: [new Date().prevDate(), new Date().prevDate()],
          [locale('近7日')]: [new Date().prevDate(6), new Date()],
          [locale('近30日')]: [new Date().prevDate(29), new Date()],
          [locale('近90日')]: [new Date().prevDate(89), new Date()],
          [locale('本周')]: [new Date().monday(), new Date()],
          [locale('本月')]: [new Date().firstMonthDate(), new Date()],
          [locale('上月')]: [
            new Date().prevMonth().firstMonthDate(),
            new Date().prevMonth().lastMonthDate()
          ],
          [locale('本季度')]: [new Date().firstQuarterDate(), new Date()],
          [locale('自定义')]: 0,
          [locale('今年')]: [new Date().firstYearDate(), new Date().lastYearDate()]
        }}
        min={new Date('2023-08-08')}
        max={new Date()}
        customModal="dates" // dates | picker
        // allowClear="exclusion-ricon"
        value={value}
        onError={(error) => {
          console.log(error)
        }}
        onBeforeChange={(newValue) => {
          console.log('修改前:', newValue)
          return true
        }}
        onChange={(newValue) => {
          console.log('修改:', newValue)
          setValue(newValue)
        }}
      />
    </>
  )
}
