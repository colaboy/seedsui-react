import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { DatePicker, DateUtil, locale } from 'seedsui-react'

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
        diff={100}
        // year | quarter | month | date | time | datetime | week
        type="date"
        // separator="to"
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
          // MainProps: {
          //   onChange: (value, { rangeId, ranges }) => {
          //     console.log(value, rangeId, ranges)
          //     if (ranges && rangeId && Array.isArray(ranges[rangeId])) {
          //       setValue(ranges[rangeId])
          //       dateRef.current.close()
          //     }
          //   }
          // }
        }}
        // 自定义渲染
        // comboRender={({ displayValue }) => {
        //   return icon + displayValue
        // }}
        // Main props
        // titles={{
        //   custom: '自定义选择',
        //   selector: '快捷选择'
        // }}
        ranges={null}
        // ranges={{
        //   [locale('今日', 'SeedsUI_today')]: [new Date(), new Date()],
        //   [locale('今天')]: [new Date(), new Date()],
        //   [locale('昨日', 'SeedsUI_yesterday')]: [
        //     dayjs().subtract(1, 'day').toDate(),
        //     dayjs().subtract(1, 'day').toDate()
        //   ],
        //   [locale('近7日', 'SeedsUI_last_days', ['7'])]: [
        //     dayjs().subtract(6, 'day').toDate(),
        //     new Date()
        //   ],
        //   [locale('近30日', 'SeedsUI_last_days', ['30'])]: [
        //     dayjs().subtract(29, 'day').toDate(),
        //     new Date()
        //   ],
        //   [locale('近90日', 'SeedsUI_last_days', ['90'])]: [
        //     dayjs().subtract(89, 'day').toDate(),
        //     new Date()
        //   ],
        //   [locale('本周', 'SeedsUI_this_week')]: [dayjs().day(1).toDate(), new Date()],
        //   [locale('本月', 'SeedsUI_this_month')]: [dayjs().date(1).toDate(), new Date()],
        //   [locale('上月', 'SeedsUI_last_month')]: [
        //     dayjs().date(1).subtract(1, 'month').toDate(),
        //     dayjs().date(1).subtract(1, 'day').toDate()
        //   ],
        //   [locale('本季度', 'SeedsUI_this_quarter')]: [
        //     DateUtil.firstDayOfQuarter(new Date()),
        //     new Date()
        //   ],
        //   [locale('自定义', 'SeedsUI_custom')]: 0,
        //   [locale('今年', 'SeedsUI_this_year')]: [
        //     DateUtil.firstDayOfYear(new Date()),
        //     DateUtil.lastDayOfYear(new Date())
        //   ]
        // }}
        min={new Date()}
        // max={new Date('2024-12-12')}
        value={value}
        // defaultPickerValue={[new Date('2022-08-22 00:00'), new Date('2022-09-22 12:12')]}
        onError={(error) => {
          console.log(error)
          // return true
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
