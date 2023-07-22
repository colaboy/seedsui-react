import React, { useState } from 'react'
import CountriesData from './../CountriesData'

import { Cascader, Loading } from 'seedsui-react'

export default () => {
  // 控件将会补充parentid和isDistrict, 所以顺序不能传错
  const [value, setValue] = useState([
    { name: '中国', id: '86' },
    { id: '320000', name: '江苏省', parentid: '86' }
    // { id: '320100', name: '南京市', parentid: '320000' },
    // { id: '320105', name: '建邺区', parentid: '320100', isDistrict: true }
  ])

  // 加载街道
  function loadData(tabs) {
    return new Promise((resolve) => {
      if (!Array.isArray(tabs) || !tabs.length) {
        resolve(null)
        return
      }
      let lastTab = tabs[tabs.length - 1]
      if (lastTab.isDistrict !== true) {
        resolve(null)
        return
      }
      Loading.show()
      // let streets = await DistrictUtil.getStreet(lastTab.id)
      let streets = [
        {
          parentid: lastTab.id,
          name: '街道1',
          id: 'street1'
        }
      ]
      setTimeout(() => {
        Loading.hide()
      }, 100)
      if (typeof streets === 'string') {
        Toast.show({ content: streets })
      }
      resolve(streets)
    })
  }

  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Cascader.DistrictCombo
        disabled="exclusion-ricon"
        min="district" // ['country', 'province', 'city', 'district', 'street']
        type="city"
        list={CountriesData}
        loadData={loadData}
        value={value}
        placeholder={`Select District`}
        ricon={<i className="ricon shape-arrow-right sm"></i>}
        onChange={(newValue) => {
          console.log(newValue)
          setValue(newValue)
        }}
        // submitProps={{
        //   visible: true
        // }}
        captionProps={{
          caption: '级联选择'
        }}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
      />
    </div>
  )
}
