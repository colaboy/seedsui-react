import React, { useState, useRef, useEffect } from 'react'
import { Bridge, Location, MapUtil } from 'seedsui-react'

export default () => {
  Bridge.debug = true
  const comboRef = useRef(null)
  const [value, setValue] = useState({
    latitude: '39.909187',
    longitude: '116.397451',
    value: '北京'
  })
  // const [value, setValue] = useState({
  //   errMsg: 'getLocation:ok',
  //   longitude: '116.397451',
  //   latitude: '39.909187',
  //   value: '北京市东城区中华路甲10号中国天安门广场'
  // })
  useEffect(() => {
    Bridge.ready(() => {})
    console.log(comboRef.current)
    MapUtil.load({
      ak: '3pTjiH1BXLjASHeBmWUuSF83',
      success: () => {
        console.log('地图加载完成')
      },
      fail: () => {
        console.error('地图库加载失败，请稍后再试！')
      }
    })
  }, [])
  return (
    <>
      <Location.Combo
        modal="page"
        // disabled
        readOnly
        autoFit
        editable
        // allowClear
        ref={comboRef}
        value={value}
        previewVisible
        chooseVisible
        onChange={(val) => {
          console.log(val)
          setValue(val)
        }}
      />
    </>
  )
}
