import React, { useState } from 'react'
import { DatePicker, locale } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState({
    type: 'date',
    id: 'date',
    name: '日',
    value: new Date()
  })

  return (
    <>
      <DatePicker.Types
        value={value}
        list={[
          {
            type: 'date',
            id: 'date',
            name: locale('日', 'datetype_unit_date')
          },
          {
            type: 'month',
            id: 'month',
            name: locale('月', 'datetype_unit_month')
          },
          {
            type: 'quarter',
            id: 'quarter',
            name: locale('季', 'datetype_unit_quarter')
          },
          {
            type: 'year',
            id: 'year',
            name: locale('年', 'datetype_unit_year')
          },
          {
            type: 'week',
            id: 'week',
            name: locale('周', 'datetype_unit_week')
          }
        ]}
        onChange={(newValue) => {
          console.log('修改:', newValue)
          setValue(newValue)
        }}
        // TabsProps={{ className: 'hide' }}
        contentProps={{ className: 'flex flex-left' }}
        pickerRender={(tab, { onChange }) => {
          if (tab.type === 'week') {
            return <div onClick={() => onChange && onChange(new Date('2022-12-12'))}>点我</div>
          }
        }}
      />
    </>
  )
}
