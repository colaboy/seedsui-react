import React, { useState, useRef } from 'react'
import countriesData from './countriesData'
import chinaData from './chinaData'

import { Cascader, Loading } from 'seedsui-react'

countriesData[0].children = chinaData

export default () => {
  const districtComboRef = useRef(null)
  const [value2, setValue2] = useState([
    { id: '320000', name: '江苏省', parentid: '86' },
    { id: '320100', name: '南京市', parentid: '320000' }
  ])

  // 控件将会补充parentid和isDistrict, 所以顺序不能传错
  const [value, setValue] = useState([
    { name: '中国', id: '86' },
    { id: '320000', name: '江苏省', parentid: '86' },
    { id: '320100', name: '南京市', parentid: '320000' },
    { id: '320105', name: '建邺区', parentid: '320100', isDistrict: true }
  ])
  console.log('districtComboRef:', districtComboRef)

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
      <Cascader.DistrictCombo
        // type="city"
        value={value2}
        onChange={setValue2}
        placeholder="Please Select"
      />
      <Cascader.DistrictCombo
        ref={districtComboRef}
        // 编辑控制
        allowClear="exclusion-ricon"
        ricon={<i className="ricon shape-arrow-right sm"></i>}
        // min="province" // ['country', 'province', 'city', 'district', 'street']
        // type="district"
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
        editableOptions={{
          country: { editable: false },
          province: { editable: false }
          // city: { editable: false },
          // district: { editable: false }
          // street: { editable: true }
        }}
        ModalProps={{
          captionProps: {
            caption: '级联选择'
          },
          MainProps: {
            footerRender: ({ value, onChange, currentValue, onChangeCurrentValue }) => {
              return (
                <div
                  onClick={() => {
                    onChange(currentValue)
                  }}
                >
                  提交
                </div>
              )
            },
            headerRender: ({ value, onChange, currentValue, onChangeCurrentValue }) => {
              return (
                <div
                  onClick={() => {
                    onChangeCurrentValue([
                      {
                        name: '中国',
                        id: '86',
                        type: ['country']
                      },
                      {
                        id: '320000',
                        name: '江苏省',
                        parentid: '86',
                        type: ['province']
                      },
                      {
                        id: '320100',
                        name: '南京市',
                        parentid: '320000',
                        type: ['city']
                      },
                      {
                        id: '320105',
                        name: '建邺区',
                        parentid: '320100',
                        isDistrict: true,
                        type: ['district']
                      },
                      {
                        parentid: '320105',
                        name: '街道1',
                        id: 'street1',
                        isStreet: true,
                        type: ['street']
                      }
                    ])
                  }}
                >
                  点击还原
                </div>
              )
            }
          }
        }}
      />
    </div>
  )
}
