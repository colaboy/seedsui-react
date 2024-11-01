import React, { useEffect, useRef, useState } from 'react'
import { DatePicker, locale } from 'seedsui-react'

export default () => {
  const dateRef = useRef(null)
  const [value, setValue] = useState([new Date('2024-10-31'), new Date('2024-10-31')])
  const [icon, setIcon] = useState('1')

  useEffect(() => {
    dateRef.current.open()
  }, [])

  return (
    <>
      {icon}
      <DatePicker.RangeCombo
        ref={dateRef}
        type="week"
        // disabledStart
        // disabledEnd
        allowClear
        onVisibleChange={(visible) => {
          console.log('visible2:', visible)
          if (visible) {
            setIcon('2')
          } else {
            setIcon('1')
          }
        }}
        ModalProps={{
          captionProps: {
            caption: '选择日期'
          },
          maskProps: {
            style: {
              zIndex: 999
            }
          }
        }}
        // 自定义渲染
        // comboRender={({ displayValue }) => {
        //   return icon + displayValue
        // }}
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
        min={new Date()}
        max={new Date('2024-12-12')}
        diff={30}
        value={value}
        defaultPickerValue={[new Date('2022-08-22 00:00'), new Date('2022-09-22 12:12')]}
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
