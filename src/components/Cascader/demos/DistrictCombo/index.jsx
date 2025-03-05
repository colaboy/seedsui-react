import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Layout, Cascader } from 'seedsui-react'

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
        {
          name: '中国',
          id: '86'
        },
        {
          name: '北京市',
          id: '110000'
        },
        {
          name: '东城区',
          id: '110101'
        }
        // {
        //   name: '东华门街道',
        //   id: '110101001'
        // }
      ])
    }, 2000)
  }, [])
  return (
    <Layout className="full">
      <Layout.Main>
        <Cascader.DistrictCombo
          // readOnly
          // type="a"
          startType={'country'}
          // multiple
          // type="country"
          // type="province"
          // type="city"
          type="district"
          // type="street"
          // min="province"
          editableOptions={
            {
              // country: { editable: false },
              // province: { editable: false }
              // city: { editable: true },
              // district: { editable: true },
              // street: { editable: true }
            }
          }
          value={value}
          onChange={(newValue) => {
            console.log('修改: ', newValue)
            setValue(newValue)
          }}
          placeholder={'点击选择'}
          allowClear
          clear={({ clearable, triggerClear }) => {
            return clearable ? (
              <i className="input-clear" onClick={triggerClear} />
            ) : (
              <i className="right-icon shape-arrow-right sm"></i>
            )
          }}
          modalProps={{ maskProps: { style: { zIndex: '9' } } }}
        />
      </Layout.Main>
    </Layout>
  )
}
