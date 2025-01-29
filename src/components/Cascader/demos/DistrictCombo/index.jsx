import React, { useState, useEffect } from 'react'

import { Cascader } from 'seedsui-react'

// 判断省市区的数据
import countryIds from './data/countryIds'
import provinceIds from './data/provinceIds'
import municipalityIds from './data/municipalityIds'
import cityIds from './data/cityIds'
import prefectureIds from './data/prefectureIds'
import districtIds from './data/districtIds'
import streetIds from './data/streetIds'

// 判断省市区的数据
window.countryIds = countryIds
window.provinceIds = provinceIds
window.municipalityIds = municipalityIds
window.cityIds = cityIds
window.prefectureIds = prefectureIds
window.districtIds = districtIds
window.streetIds = streetIds

export default () => {
  // 控件将会补充parentid和isDistrict, 所以顺序不能传错
  const [value, setValue] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setValue([
        // {
        //   id: '86',
        //   name: '中国',
        //   type: ['country']
        // },
        {
          id: '810000',
          name: '香港特别行政区',
          parentid: '86',
          type: ['province', 'city', 'municipality']
        },
        {
          id: '810107',
          name: '九龙城区',
          parentid: '810000',
          type: ['district'],
          isLeaf: true
        }
      ])
    }, 2000)
  }, [])
  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Cascader.DistrictCombo
        // readOnly
        startType={'country'}
        multiple
        // type="country"
        // type="province"
        // type="district"
        // type="district"
        // type="street"
        max="city"
        editableOptions={{
          country: { editable: false },
          province: { editable: true },
          city: { editable: true },
          district: { editable: true },
          street: { editable: true }
        }}
        value={value}
        onChange={(newValue) => {
          console.log('修改: ', newValue)
          setValue(newValue)
        }}
        placeholder={'点击选择'}
        allowClear
        clear={({ triggerClear }) => {
          return value?.length ? (
            <i className="input-clear" onClick={triggerClear} />
          ) : (
            <i className="right-icon shape-arrow-right sm"></i>
          )
        }}
        modalProps={{ maskProps: { style: { zIndex: '9' } } }}
      />
    </div>
  )
}
