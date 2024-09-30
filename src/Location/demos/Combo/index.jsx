import React, { useState, useRef, useEffect } from 'react'
import { Bridge, Location, MapUtil, Input } from 'seedsui-react'
import VConsole from 'vconsole'
window.getAddressDefault = function (data) {
  if (data?.value) {
    console.log(data)
    return data
  }
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
}

export default () => {
  Bridge.debug = true
  const comboRef = useRef(null)
  const [value, setValue] = useState(null)
  // const [value, setValue] = useState({
  //   errMsg: 'getLocation:ok',
  //   longitude: 118.74,
  //   latitude: 31.99,
  //   longitude: '116.397451',
  //   latitude: '39.909187',
  //   title: '天安门',
  //   value: '北京市东城区中华路甲10号中国天安门广场南边100米左右'
  //   // longitude: 118.73,
  //   // latitude: 31.98,
  //   // value: '南京市国家广告产业园'
  // })
  useEffect(() => {
    new VConsole()
  }, [])

  return (
    <>
      <Location.Combo
        // editable
        // 获取定位和地址工具类
        // type="wgs84"
        config={{
          key: '7b6e260fc45a67b31a265e22575f1c5e',
          type: 'bmap'
        }}
        getLocation={({ type }) => {
          return { longitude: 116.397451, latitude: 39.909187, type: type }
        }}
        // getAddress={(data) => {
        //   if (data?.value) {
        //     console.log(data)
        //     return data
        //   }
        //   return new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve({
        //         longitude: 118.74,
        //         latitude: 31.99,
        //         province: '江苏',
        //         provinceNumber: '',
        //         city: '南京',
        //         cityNumber: '',
        //         district: '建邺',
        //         districtNumber: '',
        //         street: '街道',
        //         streetNumber: '',
        //         address: '江苏省南京市建邺区云龙山路88号烽火科技大厦'
        //       })
        //     }, 1000)
        //   })
        // }}
        // modal="page"
        MainProps={{
          autoLocation: false
        }}
        // disabled
        allowClear
        autoFit
        autoLocation
        clickAction="choose"
        // editable
        previewVisible
        chooseVisible
        // allowClear
        ref={comboRef}
        value={value}
        // 点击整行触发的动作: location | choose | preview
        onChange={(val) => {
          console.log('修改:', val)
          setValue(val)
        }}
        onVisibleChange={(visible) => {
          console.log('显隐:', visible)
        }}
        onLocationStatusChange={(status) => {
          console.log('定位状态:', status)
        }}
      />
      <Input.Text value="aaaa" />
    </>
  )
}
