import React, { useState, useEffect, useRef } from 'react'
import { ArrayUtil } from 'seedsui-react'
import districtLevelData from './chinaLvlData'
import countriesData from './countriesData'
import chinaData from './chinaData'

import { Cascader, Loading } from 'seedsui-react'

window.districtLevelData = districtLevelData

export default () => {
  const districtComboRef = useRef(null)
  // 控件将会补充parentid和isDistrict, 所以顺序不能传错
  const [value, setValue] = useState([
    { name: '中国', id: '86' },
    { id: '320000', name: '江苏省', parentid: '86' },
    { id: '320100', name: '南京市', parentid: '320000' },
    { id: '320105', name: '建邺区', parentid: '320100' }
  ])
  loadCountry(value)

  // 加载国家
  function loadCountry(value) {
    if (!Array.isArray(value) || !value.length) return
    if (value[value.length - 1].id === '86' && !value[value.length - 1].children) {
      countriesData[0].children = chinaData
    }
  }

  // 加载街道
  function loadData(tabs) {
    return new Promise((resolve) => {
      debugger
      if (!Array.isArray(tabs) || !tabs.length) {
        resolve(null)
        return
      }

      // 国家没有省市区, 则先补充省市区
      let country = ArrayUtil.getDeepTreeNode(countriesData, tabs[0].id)
      if (!country.children) {
        let countryId = tabs[0].id
        for (let country of countriesData) {
          if (country.id === countryId) {
            debugger
            country.children = chinaData
            break
          }
        }
      }

      let lastTab = tabs[tabs.length - 1]

      if (!lastTab?.type?.includes?.('district')) {
        resolve(null)
        return
      }
      Loading.show()
      // let streets = await DistrictUtil.getStreet(lastTab.id)
      let streets = [
        {
          parentid: lastTab.id,
          name: '街道1',
          id: 'street1',
          isStreet: true
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
      {/* <Cascader.DistrictCombo
        // type="city"
        value={value2}
        onChange={setValue2}
        placeholder="Please Select"
      /> */}
      <Cascader.DistrictCombo
        ref={districtComboRef}
        // 编辑控制
        allowClear="exclusion-ricon"
        ricon={<i className="ricon shape-arrow-right sm"></i>}
        min="country" // ['country', 'province', 'city', 'district', 'street']
        // type="city"
        loadData={loadData}
        value={value}
        placeholder={`Select District`}
        onChange={(newValue) => {
          console.log(newValue)
          setValue(newValue)
        }}
        // clearProps={{
        //   className: 'hide-important'
        // }}
        // submitProps={{
        //   visible: true
        // }}
        list={countriesData}
        // loadList={() => {
        //   return new Promise((resolve) => {
        //     Loading.show()
        //     setTimeout(() => {
        //       Loading.hide()
        //       resolve(chinaData)
        //     }, 2000)
        //   })
        // }}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
        // 未弹出选择框便加载
        async={false}
        // editableOptions={{
        //   country: { editable: false },
        //   province: { editable: false },
        //   city: { editable: false },
        //   district: { editable: false },
        //   street: { editable: false }
        // }}
        ModalProps={{
          captionProps: {
            caption: '级联选择'
          },
          MainProps: {
            footerRender: ({ value, onChange }) => {
              return (
                <div
                  onClick={() => {
                    onChange(value)
                  }}
                >
                  提交
                </div>
              )
            }
            // headerRender: ({ value, onChange }) => {
            //   return (
            //     <div
            //       onClick={() => {
            //         setValue([
            //           { name: '中国', id: '86' },
            //           { id: '320000', name: '江苏省', parentid: '86' },
            //           { id: '320100', name: '南京市', parentid: '320000' },
            //           { id: '320105', name: '建邺区', parentid: '320100' }
            //         ])
            //       }}
            //     >
            //       点击还原
            //     </div>
            //   )
            // }
          }
        }}
      />
    </div>
  )
}
