import React, { useState } from 'react'
import dayjs from 'dayjs'
import { DatePicker, Layout, DateUtil, locale } from 'seedsui-react'

export default () => {
  const [rangeId, setRangeId] = useState(null)
  const [value, setValue] = useState([new Date(), new Date()])
  return (
    <Layout className="full">
      <Layout.Header className="text-center">日期快捷选择</Layout.Header>
      <Layout.Main className="bg-white">
        <DatePicker.RangeMain
          // style={{ padding: 0 }}
          // allowClear
          // titles={{
          //   custom: '自定义选择',
          //   selector: '快捷选择'
          // }}
          // type="datetime"
          // ranges={{
          //   [LocaleUtil.text('自定义')]: 10
          // }}
          // ranges={{
          //   ['今日']: [dayjs().toDate(), dayjs().toDate()],
          //   ['未来一个月']: [new Date(), dayjs().add(29, 'day').toDate()],

          //   ['未来三个月']: [new Date(), dayjs().add(89, 'day').toDate()],

          //   ['自定义']: 365
          // }}
          // min={new Date('2023-08-08')}
          // max={new Date()}
          // allowClear="excludeRightIcon"
          rangeId={rangeId}
          value={value}
          // onError={(error) => {
          //   console.log(error)
          // }}
          onChange={(newValue, { rangeId }) => {
            console.log('修改:', newValue)
            setValue(newValue)
            setRangeId(rangeId)
          }}
        />
      </Layout.Main>
    </Layout>
  )
}
