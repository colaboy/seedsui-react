import React, { useState } from 'react'
import { Cascader } from 'seedsui-react'
import CountriesData from './CountriesData'

export default () => {
  const [cascader, setCascader] = useState(null)
  function handleCascader(value: any) {
    console.log(value)
    setCascader(value)
  }
  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Cascader.DistrictCombo
        submitProps={{ disabled: false }}
        list={CountriesData}
        placeholder="请选择"
        value={cascader}
        type="district"
        onChange={handleCascader}
      />
    </div>
  )
}
