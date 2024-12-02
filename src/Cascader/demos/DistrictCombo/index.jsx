import React, { useState, useRef } from 'react'
import _ from 'lodash'
import { ArrayUtil, Cascader, Loading } from 'seedsui-react'

// 判断省市区的数据
import countryIds from './data/countryIds'
import provinceIds from './data/provinceIds'
import municipalityIds from './data/municipalityIds'
import cityIds from './data/cityIds'
import districtIds from './data/districtIds'
import streetIds from './data/streetIds'

// 渲染数据
import countriesData from './data/countriesData'
import chinaData from './data/chinaData'

// 判断省市区的数据
window.countryIds = countryIds
window.provinceIds = provinceIds
window.municipalityIds = municipalityIds
window.cityIds = cityIds
window.municipalityIds = municipalityIds
window.districtIds = districtIds
window.streetIds = streetIds

// 渲染数据
window.districtData = countriesData
const list = countriesData

// 获取国家的省市区
function getProvinces(countryId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(_.cloneDeep(chinaData))
    }, 100)
  })
}

// 获取街道
function getStreets(id) {
  return new Promise((resolve) => {
    let streets = [
      {
        parentid: id,
        name: '街道1',
        id: 'street1',
        isStreet: true,
        isLeaf: true
      }
    ]
    setTimeout(() => {
      resolve(streets)
    }, 100)
  })
}

export default () => {
  const districtComboRef = useRef(null)
  // 控件将会补充parentid, 所以顺序不能传错
  const [value, setValue] = useState([
    { name: '中国', id: '86' },
    { id: '320000', name: '江苏省', parentid: '86' },
    { id: '320100', name: '南京市', parentid: '320000' },
    { id: '320105', name: '建邺区', parentid: '320100' }
  ])

  // 加载街道
  async function loadData(tabs) {
    console.log(list)
    // debugger
    if (!Array.isArray(tabs) || !tabs.length) {
      return null
    }

    // 国家没有省市区, 则先补充省市区
    let country = ArrayUtil.getDeepTreeNode(list, tabs[0].id)
    if (!country.children) {
      let countryId = tabs[0].id
      for (let country of list) {
        if (country.id === countryId) {
          // country.children = await DistrictUtil.getProvinces(country.id)
          // 此处替换成各个国家的省市区数据
          country.children = await getProvinces(country.id)

          // 更新parentid
          ArrayUtil.updateDeepTreeParentId(list)

          console.log(
            ArrayUtil.deepTree([
              { id: '1', name: 'Root 1', parentid: null },
              { id: '2', name: 'Child 1-1', parentid: '1' },
              { id: '3', name: 'Child 1-2', parentid: '1' },
              { id: '4', name: 'Root 2', parentid: null },
              { id: '5', name: 'Child 2-1', parentid: '4' },
              { id: '6', name: 'Grandchild 1-1-1', parentid: '2' }
            ])
          )
          // 更新value的type属性
          districtComboRef?.current?.updateValueType?.(tabs, list)
          break
        }
      }
    }

    // 获取下钻的子级
    let lastTab = tabs[tabs.length - 1]

    // 获取下钻的子级: 同步获取
    let currentNode = ArrayUtil.getDeepTreeNode(list, lastTab.id)
    if (!_.isEmpty(currentNode.children)) {
      return currentNode.children
    }

    // 获取下钻的子级: 异步获取
    Loading.show()
    // let streets = await DistrictUtil.getStreet(lastTab.id)
    // 此处换为真实的接口请求
    let streets = await getStreets(lastTab.id)
    if (typeof streets === 'string') {
      Toast.show({ content: streets })
    }
    Loading.hide()
    return streets
  }

  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Cascader.DistrictCombo
        ref={districtComboRef}
        // 编辑控制
        allowClear="exclusion-ricon"
        ricon={<i className="ricon shape-arrow-right sm"></i>}
        min="city" // ['country', 'province', 'city', 'district', 'street']
        // type="district"
        loadData={loadData}
        value={value}
        placeholder={`Select District`}
        onChange={(newValue) => {
          console.log('修改:', newValue)
          setValue(newValue)
        }}
        // clearProps={{
        //   className: 'hide-important'
        // }}
        // submitProps={{
        //   visible: true
        // }}
        // list={list}
        loadList={() => {
          return new Promise((resolve) => {
            Loading.show()
            setTimeout(() => {
              Loading.hide()
              resolve(list)
            }, 100)
          })
        }}
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
