import React, { useState } from 'react'
import { Cascader } from 'seedsui-react'
import CountriesData from './CountriesData'

export default () => {
  const [cascader, setCascader] = useState(null)
  function handleCascader(value) {
    console.log(value)
    setCascader(value)
  }
  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Cascader.DistrictCombo
        cancelProps={{ disabled: true }}
        okProps={{ disabled: false }}
        list={CountriesData}
        placeholder="请选择"
        value={cascader}
        type="district"
        onChange={handleCascader}
      />
    </div>
  )
}
