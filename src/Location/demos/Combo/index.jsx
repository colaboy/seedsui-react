import React, { useState, useRef, useEffect } from 'react'
import { Bridge, Location, MapUtil } from 'seedsui-react'
import VConsole from 'vconsole'
export default () => {
  Bridge.debug = true
  const [load, setLoad] = useState(false)
  const comboRef = useRef(null)
  // const [value, setValue] = useState(null)
  const [value, setValue] = useState({
    // errMsg: 'getLocation:ok',
    // longitude: 118.74,
    // latitude: 31.99
    // longitude: '116.397451',
    // latitude: '39.909187',
    // title: '天安门',
    // value: '北京市东城区中华路甲10号中国天安门广场'
    longitude: 118.73,
    latitude: 31.98,
    value: '南京市国家广告产业园'
  })
  useEffect(() => {
    new VConsole()
    Bridge.ready(() => {
      Bridge.getLocation({
        cacheTime: 5000,
        success: (res) => {
          setTimeout(() => {
            Bridge.getLocation({
              success: (res) => {
                console.log('1-1:' + JSON.stringify(res))
              }
            })
          }, 100)
          console.log('1:' + JSON.stringify(res))
        }
      })

      Bridge.getLocation({
        success: (res) => {
          console.log('2:' + JSON.stringify(res))
        }
      })
      Bridge.getLocation({
        success: (res) => {
          console.log('3:' + JSON.stringify(res))
        }
      })
    })
    console.log(comboRef.current)
    MapUtil.load({
      ak: '3pTjiH1BXLjASHeBmWUuSF83',
      success: () => {
        setLoad(true)
        console.log('地图加载完成')
      },
      fail: () => {
        console.error('地图库加载失败，请稍后再试！')
      }
    })
  }, [])

  if (!load) return null
  return (
    <>
      <Location.Combo
        // 地址逆解析
        geocoder={(data) => {
          // if (data?.value) {
          //   console.log(data)
          //   return data
          // }
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                longitude: 118.74,
                latitude: 31.99,
                province: '江苏',
                provinceNumber: '',
                city: '南京',
                cityNumber: '',
                district: '建邺',
                districtNumber: '',
                street: '街道',
                streetNumber: '',
                address: '江苏省南京市建邺区云龙山路88号烽火科技大厦'
              })
            }, 1000)
          })
        }}
        ak="3pTjiH1BXLjASHeBmWUuSF83"
        modal="page"
        MainProps={{
          autoLocation: false
        }}
        // disabled
        allowClear
        autoFit
        autoLocation
        // editable
        // allowClear
        ref={comboRef}
        value={value}
        // previewVisible
        // chooseVisible
        // 点击整行触发的动作: location | choose | preview
        clickAction="choose"
        onChange={(val) => {
          console.log('修改:', val)
          setValue(val)
        }}
        onBeforeChange={(val) => {
          console.log('beforechange:', val)
          if (!val) return true
          return true
        }}
        onVisibleChange={(visible) => {
          console.log('显隐:', visible)
        }}
      />
    </>
  )
}
