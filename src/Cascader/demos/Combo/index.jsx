import React, { useState } from 'react'
import { Cascader, Loading } from 'seedsui-react'
import CountriesData from './../CountriesData'

export default () => {
  const [value, setValue] = useState(null)

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
      <Cascader.Combo
        // multiple={false}
        list={CountriesData}
        loadData={loadData}
        value={value}
        onChange={(newValue) => {
          console.log('newValue:', newValue)
          setValue(newValue)
        }}
        allowClear
        placeholder={`Select`}
        ricon={<i className="shape-arrow-right sm"></i>}
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
