import React, { useState, useRef, useEffect } from 'react'
import { Bridge, Location, MapUtil } from 'seedsui-react'

export default () => {
  Bridge.debug = true
  const comboRef = useRef(null)
  const [value, setValue] = useState({
    errMsg: 'getLocation:ok',
    longitude: '116.397451',
    latitude: '39.909187',
    speed: '0.0',
    accuracy: '3.0.0',
    point: ['116.397451', '39.909187'],
    address: '北京市东城区中华路甲10号',
    addressComponents: {
      streetNumber: '甲10号',
      street: '中华路',
      district: '东城区',
      city: '北京市',
      province: '北京市',
      town: ''
    },
    surroundingPois: [
      {
        title: '天安门',
        uid: '65e1ee886c885190f60e77ff',
        point: {
          lng: 116.40395508249037,
          lat: 39.91511237702834,
          Xe: 'inner'
        },
        city: '北京市',
        hj: '旅游景点',
        type: 0,
        address: '北京市东城区长安街',
        postcode: null,
        phoneNumber: null,
        tags: ['旅游景点']
      },
      {
        title: '天安门城楼检票处-入口',
        uid: 'f7a0d122f3307a767dc876f1',
        point: {
          lng: 116.40380237055368,
          lat: 39.915582771432526,
          Xe: 'inner'
        },
        city: '北京市',
        hj: '出入口',
        type: 0,
        address: '北京市东城区东长安街天安门内',
        postcode: null,
        phoneNumber: null,
        tags: ['出入口']
      },
      {
        title: '天安门-出口',
        uid: 'e93b3a20e96f63d55cd4fe95',
        point: {
          lng: 116.40423355719847,
          lat: 39.91542366780735,
          Xe: 'inner'
        },
        city: '北京市',
        hj: '出入口',
        type: 0,
        address: '北京市东城区天安门内',
        postcode: null,
        phoneNumber: null,
        tags: ['出入口']
      },
      {
        title: '天安门-入口',
        uid: 'fd975efc10193656734b879a',
        point: {
          lng: 116.40364067556187,
          lat: 39.91585947250196,
          Xe: 'inner'
        },
        city: '北京市',
        hj: '出入口',
        type: 0,
        address: '北京市东城区天安门内',
        postcode: null,
        phoneNumber: null,
        tags: ['出入口']
      },
      {
        title: '天安门服务部',
        uid: '82cedd210532116a7ab55c3f',
        point: {
          lng: 116.40450304885145,
          lat: 39.91554126617491,
          Xe: 'inner'
        },
        city: '北京市',
        hj: '生活服务',
        type: 0,
        address: '北京市东城区广场东侧路与西长安街交叉路口往西北约210米',
        postcode: null,
        phoneNumber: null,
        tags: ['生活服务']
      },
      {
        title: '北京2022官方特许商品零售店',
        uid: '5a6b33733feafbd0d22dd6a9',
        point: {
          lng: 116.40451203190655,
          lat: 39.91561044159018,
          Xe: 'inner'
        },
        city: '北京市',
        hj: '购物',
        type: 0,
        address: '北京市东城区中华路6号',
        postcode: null,
        phoneNumber: null,
        tags: ['购物']
      }
    ],
    business: '',
    province: '北京市',
    city: '北京市',
    district: '东城区',
    data: [
      {
        id: '',
        name: '北京市'
      },
      {
        id: '',
        name: '北京市'
      },
      {
        id: '',
        name: '东城区'
      }
    ],
    value: '北京市东城区中华路甲10号中国天安门广场'
  })
  useEffect(() => {
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
