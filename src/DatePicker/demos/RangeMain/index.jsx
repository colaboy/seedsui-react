import React, { useState } from 'react'
import dayjs from 'dayjs'
import { DatePicker, Layout, DateUtil, locale } from 'seedsui-react'
import en_US from './../../../assets/seedsui/locale/en_US.json'
window.localeData = en_US

export default () => {
  const [value, setValue] = useState([new Date(), new Date()])
  return (
    <Layout className="full">
      <Layout.Header className="text-center">日期快捷选择</Layout.Header>
      <Layout.Main className="bg-white">
        <DatePicker.RangeMain
          // style={{ padding: 0 }}
          allowClear
          titles={{
            custom: '自定义选择',
            selector: '快捷选择'
          }}
          // type="datetime"
          // ranges={{
          //   [locale('自定义')]: 10
          // }}
          ranges={{
            [locale('今日', 'SeedsUI_today')]: [new Date(), new Date()],
            [locale('今天')]: [new Date(), new Date()],
            [locale('昨日', 'SeedsUI_yesterday')]: [
              dayjs().subtract(1, 'day').toDate(),
              dayjs().subtract(1, 'day').toDate()
            ],
            [locale('近7日', 'SeedsUI_last_days', ['7'])]: [
              dayjs().subtract(6, 'day').toDate(),
              new Date()
            ],
            [locale('近30日', 'SeedsUI_last_days', ['30'])]: [
              dayjs().subtract(29, 'day').toDate(),
              new Date()
            ],
            [locale('近90日', 'SeedsUI_last_days', ['90'])]: [
              dayjs().subtract(89, 'day').toDate(),
              new Date()
            ],
            [locale('本周', 'SeedsUI_this_week')]: [dayjs().day(1).toDate(), new Date()],
            [locale('本月', 'SeedsUI_this_month')]: [dayjs().date(1).toDate(), new Date()],
            [locale('上月', 'SeedsUI_last_month')]: [
              dayjs().date(1).subtract(1, 'month').toDate(),
              dayjs().date(1).subtract(1, 'day').toDate()
            ],
            [locale('本季度', 'SeedsUI_this_quarter')]: [
              DateUtil.firstDayOfQuarter(new Date()),
              new Date()
            ],
            [locale('自定义', 'SeedsUI_custom')]: 0,
            [locale('今年', 'SeedsUI_this_year')]: [
              DateUtil.firstDayOfYear(new Date()),
              DateUtil.lastDayOfYear(new Date())
            ]
          }}
          // min={new Date('2023-08-08')}
          // max={new Date()}
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
      </Layout.Main>
    </Layout>
  )
}
