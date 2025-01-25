import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { DatePicker, DateUtil, LocaleUtil } from 'seedsui-react'

export default () => {
  const dateRef = useRef(null)
  const [value, setValue] = useState([new Date('2024-10-31'), new Date('2024-10-31')])
  const [icon, setIcon] = useState('1')

  useEffect(() => {
    console.log(dateRef.current)
    dateRef.current.open()
  }, [])

  return (
    <>
      {icon}
      <DatePicker.RangeCombo
        ref={dateRef}
        diff={40}
        // year | quarter | month | date | time | datetime | week
        type="week"
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
        modalProps={{
          captionProps: {
            caption: '选择日期'
          },
          maskProps: {
            style: {
              zIndex: 999
            }
          }
          // mainProps: {
          //   onChange: (value, { rangeId, ranges }) => {
          //     console.log(value, rangeId, ranges)
          //     if (ranges && rangeId && Array.isArray(ranges[rangeId])) {
          //       setValue(ranges[rangeId])
          //       dateRef.current.close()
          //     }
          //   }
          // }
        }}
        // Main props
        // titles={{
        //   custom: '自定义选择',
        //   selector: '快捷选择'
        // }}
        ranges={null}
        // ranges={{
        //   [LocaleUtil.locale('今日', 'SeedsUI_today')]: [new Date(), new Date()],
        //   [LocaleUtil.locale('今天')]: [new Date(), new Date()],
        //   [LocaleUtil.locale('昨日', 'SeedsUI_yesterday')]: [
        //     dayjs().subtract(1, 'day').toDate(),
        //     dayjs().subtract(1, 'day').toDate()
        //   ],
        //   [LocaleUtil.locale('近{0}日', 'SeedsUI_last_days', ['7'])]: [
        //     dayjs().subtract(6, 'day').toDate(),
        //     new Date()
        //   ],
        //   [LocaleUtil.locale('近{0}日', 'SeedsUI_last_days', ['30'])]: [
        //     dayjs().subtract(29, 'day').toDate(),
        //     new Date()
        //   ],
        //   [LocaleUtil.locale('近{0}日', 'SeedsUI_last_days', ['90'])]: [
        //     dayjs().subtract(89, 'day').toDate(),
        //     new Date()
        //   ],
        //   [LocaleUtil.locale('本周', 'SeedsUI_this_week')]: [dayjs().day(1).toDate(), new Date()],
        //   [LocaleUtil.locale('本月', 'SeedsUI_this_month')]: [dayjs().date(1).toDate(), new Date()],
        //   [LocaleUtil.locale('上月', 'SeedsUI_last_month')]: [
        //     dayjs().date(1).subtract(1, 'month').toDate(),
        //     dayjs().date(1).subtract(1, 'day').toDate()
        //   ],
        //   [LocaleUtil.locale('本季度', 'SeedsUI_this_quarter')]: [
        //     DateUtil.firstDayOfQuarter(new Date()),
        //     new Date()
        //   ],
        //   [LocaleUtil.locale('自定义', 'SeedsUI_custom')]: 0,
        //   [LocaleUtil.locale('今年', 'SeedsUI_this_year')]: [
        //     DateUtil.firstDayOfYear(new Date()),
        //     DateUtil.lastDayOfYear(new Date())
        //   ]
        // }}
        min={new Date()}
        // max={new Date('2025-1-1')}
        hourStep={5}
        minuteStep={5}
        value={value}
        defaultPickerValue={[new Date('2022-08-22 00:00'), new Date('2022-09-22 12:12')]}
        // onError={(error) => {
        //   console.log(error)
        // }}
        onBeforeChange={(newValue, newArguments) => {
          console.log('修改前:', newValue, newArguments)
          return true
        }}
        onChange={(newValue, newArguments) => {
          console.log('修改:', newValue, newArguments)
          setValue(newValue)
        }}
      />
    </>
  )
}
