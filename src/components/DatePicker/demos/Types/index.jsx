import React, { useState } from 'react'
import { DatePicker, LocaleUtil } from 'seedsui-react'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(isoWeek)
dayjs.extend(quarterOfYear)
dayjs.extend(advancedFormat)

export default () => {
  const [value, setValue] = useState()

  return (
    <>
      <DatePicker.Types
        value={value}
        list={[
          {
            type: 'date',
            id: 'date',
            name: LocaleUtil.locale('日', 'datetype_unit_date')
          },
          {
            type: 'month',
            id: 'month',
            name: LocaleUtil.locale('月', 'datetype_unit_month')
          },
          {
            type: 'quarter',
            id: 'quarter',
            name: LocaleUtil.locale('季', 'datetype_unit_quarter')
          },
          {
            type: 'year',
            id: 'year',
            name: LocaleUtil.locale('年', 'datetype_unit_year')
          },
          {
            type: 'week',
            id: 'week',
            name: LocaleUtil.locale('周', 'datetype_unit_week')
          }
        ]}
        onChange={(newValue) => {
          console.log('修改:', newValue)
          setValue(newValue)
        }}
        // TabsProps={{ className: 'hide' }}
        contentProps={{ className: 'flex flex-left' }}
        // pickerRender={(tab, { onChange }) => {
        //   if (tab.type === 'week') {
        //     return <div onClick={() => onChange && onChange(new Date('2022-12-12'))}>点我</div>
        //   }
        // }}
      />
    </>
  )
}
