import React, { useState, useRef, useEffect } from 'react'
import { Bridge, Location, MapUtil } from 'seedsui-react'

export default () => {
  Bridge.debug = true
  const comboRef = useRef(null)
  const [value, setValue] = useState(null)
  // const [value, setValue] = useState({
  //   errMsg: 'getLocation:ok',
  //   longitude: '116.397451',
  //   latitude: '39.909187',
  //   value: '北京市东城区中华路甲10号中国天安门广场'
  // })
  // useEffect(() => {
  //   Bridge.ready(() => {})
  //   console.log(comboRef.current)
  //   MapUtil.load({
  //     ak: '3pTjiH1BXLjASHeBmWUuSF83',
  //     success: () => {
  //       console.log('地图加载完成')
  //     },
  //     fail: () => {
  //       console.error('地图库加载失败，请稍后再试！')
  //     }
  //   })
  // }, [])
  return (
    <>
      <Location.Combo
        ak="3pTjiH1BXLjASHeBmWUuSF83"
        modal="page"
        // disabled
        autoFit
        // autoLocation
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
