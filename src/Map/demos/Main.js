import React, { forwardRef, useRef, useEffect, useState } from 'react'
import { Map, Bridge, Toast, Loading, locale } from 'seedsui-react'
const {
  getAddress,
  APILoader,
  MapContainer,
  ZoomControl,
  SearchControl,
  CenterMarker,
  LocationControl,
  NearbyControl,
  Markers
} = Map

function Main(
  {
    readOnly,
    autoLocation = true,
    getAddress: customGetAddress,
    // value: {latitude: '纬度', longitude: '经度', address: '地址'}
    value: defaultValue,
    onChange,
    ...props
  },
  ref
) {
  const mapRef = useRef(null)
  let [value, setValue] = useState(defaultValue)
  let [points, setPoints] = useState(
    readOnly && defaultValue
      ? [
          {
            ...defaultValue,
            icon: window.L.icon({
              active: true,
              iconUrl: `//res.waiqin365.com/d/seedsui/leaflet/images/marker-custom-shop.png`,
              iconRetinaUrl: `//res.waiqin365.com/d/seedsui/leaflet/images/marker-custom-shop.png`,
              shadowUrl: `//res.waiqin365.com/d/seedsui/leaflet/images/marker-shadow.png`,
              shadowRetinaUrl: `//res.waiqin365.com/d/seedsui/leaflet/images/marker-shadow.png`,
              shadowSize: [39, 39],
              iconSize: [30, 49],
              iconAnchor: [15, 25]
            })
          }
        ]
      : null
  )

  // value没值时，开启自动定位，则先定位
  useEffect(() => {
    if (!autoLocation || value?.address) return

    Loading.show()
    // 默认选中当前位置
    // Bridge.debug = true
    Bridge.getLocation({
      success: async (data) => {
        let result = {
          longitude: data.longitude,
          latitude: data.latitude,
          address: data?.address,
          geoData: data?.geoData
        }
        if (!data?.address) {
          let address = await getAddress({ ...(data || {}), getAddress: customGetAddress })
          result = {
            ...result,
            ...address
          }
        }

        setValue(result)
        Loading.hide()
      },
      fail: (res) => {
        Loading.hide()
        // 赋值
        Toast.show({
          content: locale('定位失败, 请检查定位权限是否开启', 'SeedsUI_location_failed')
        })
      }
    })
  }, [])

  return (
    <MapContainer
      // api
      ref={mapRef}
      center={value}
      zoom={14}
      getAddress={customGetAddress}
      // onMoveEnd={(map) => {
      //   console.log('获取中心点:', map.getCenter())
      // }}
      // 基准路径
      iconOptions={{
        imagePath: 'https://res.waiqin365.com/d/seedsui/leaflet/images/'
      }}
      {...props}
    >
      {/* 搜索控件 */}
      <SearchControl
        onChange={(item) => {
          // console.log('选择搜索项:', item)
          setValue(item)

          onChange && onChange(item)
        }}
      />

      {/* 中心标注点: 仅用于显示 */}
      {readOnly ? null : (
        <CenterMarker
          onDragEnd={async (map) => {
            let center = map.getCenter()
            Loading.show()
            let address = await map.getAddress(center)
            Loading.hide()

            let result = { ...center, ...address }
            setValue(result)

            onChange && onChange(result)
          }}
        />
      )}

      {/* 标注点 */}
      <Markers
        points={points}
        // onClick={(e) => {
        //   console.log('点击marker:', e)
        //   // e.remove()
        //   let newMarkerIcon = window.L.icon({
        //     active: true,
        //     iconUrl: `https://res.waiqin365.com/d/seedsui/leaflet/images/marker-icon.bak.png`,
        //     iconRetinaUrl: `https://res.waiqin365.com/d/seedsui/leaflet/images/marker-icon.bak.png`,
        //     shadowUrl: `https://res.waiqin365.com/d/seedsui/leaflet/images/marker-shadow.png`,
        //     shadowRetinaUrl: `https://res.waiqin365.com/d/seedsui/leaflet/images/marker-shadow.png`,
        //     shadowSize: [33, 33],
        //     iconSize: [20, 33],
        //     iconAnchor: [10, 16]
        //   })
        //   e.setIcon(newMarkerIcon, { multiple: true })
        // }}
      />

      {/* 缩放控件 */}
      <ZoomControl
        style={{ bottom: readOnly ? '90px' : '135px' }}
        // onZoomIn={(map) => {
        //   console.log('放大', map.getZoom())
        // }}
        // onZoomOut={(map) => {
        //   console.log('缩小'), map.getZoom()
        // }}
      />

      {/* 定位控件 */}
      {readOnly ? null : (
        <LocationControl
          style={{ bottom: '135px' }}
          onChange={(result) => {
            // console.log('定位完成:', result)
            setValue(result)

            onChange && onChange(result)
          }}
        />
      )}

      {/* 附近控件 */}
      <NearbyControl
        readOnly={readOnly}
        value={value}
        radius={1000}
        onChange={(item) => {
          // console.log('选中点:', item)

          onChange && onChange(item)
        }}
        onLoad={(list) => {
          setPoints(list)
        }}
      />
    </MapContainer>
  )
}

export default forwardRef(Main)
