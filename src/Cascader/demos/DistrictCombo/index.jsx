import React, { useState } from 'react'
import { Cascader, Loading } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState([
    { name: '天津市', id: '120000', parentid: '-1' },
    { name: '河东区', id: '120102', parentid: '120000' },
    { name: '街道1', id: 'street1', parentid: '120102' }
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
        // list={CountriesData}
        loadData={loadData}
        value={value}
        placeholder={`Select District`}
        ricon={<i className="shape-arrow-right sm"></i>}
        onChange={(newValue) => {
          console.log(newValue)
          setValue(newValue)
        }}
      />
    </div>
  )
}