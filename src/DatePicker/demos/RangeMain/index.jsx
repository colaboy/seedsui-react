import React, { useState } from 'react'
import { DatePicker, Layout, locale } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState([new Date(), new Date()])
  return (
    <Layout className="full">
      <Layout.Header className="text-center">日期快捷选择</Layout.Header>
      <Layout.Main className="bg-white">
        <DatePicker.RangeMain
          titles={{
            custom: '自定义选择',
            selector: '快捷选择'
          }}
          ranges={{
            // [locale('今日')]: [new Date(), new Date()],
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
            [locale('自定义')]: 10,
            [locale('今年')]: [new Date().firstYearDate(), new Date().lastYearDate()]
          }}
          min={new Date('2023-08-08')}
          max={new Date()}
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
