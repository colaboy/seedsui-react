import React, { forwardRef, useRef, useState } from 'react'
import { Map, Toast, Loading, locale } from 'seedsui-react'
const {
  Icon,
  MapContainer,
  ZoomControl,
  SearchControl,
  CenterMarker,
  LocationControl,
  NearbyControl,
  Markers
} = Map

function MarkPoint(
  {
    readOnly,
    autoLocation = true,
    // 获取定位和地址工具类
    getAddress,
    getLocation,
    // value: {latitude: '纬度', longitude: '经度', address: '地址'}
    value: defaultValue,
    onChange,
    onMarkClick,
    ...props
  },
  ref
) {
  // 地图容器
  const mapRef = useRef(null)

  // 附近的点
  const nearbyRef = useRef(null)

  // 定位
  const locationRef = useRef(null)

  // 放大缩小
  const zoomRef = useRef(null)

  // Map center and NearbyControl
  let [value, setValue] = useState(defaultValue)

  // Marker
  let [points, setPoints] = useState(null)

  // 获取当前位置
  async function handleAutoLocation() {
    // 默认选中当前位置
    Loading.show()
    let result = await mapRef.current?.getLocation?.()
    if (typeof result === 'object') {
      result = await mapRef.current?.getAddress?.(result)
    }
    Loading.hide()

    if (typeof result === 'string') {
      Toast.show({
        content: locale('定位失败, 请检查定位权限是否开启', 'SeedsUI_location_failed')
      })
    } else {
      setValue(result)

      onChange && onChange(result)
    }
  }

  return (
    <MapContainer
      // api
      ref={mapRef}
      center={value}
      zoom={14}
      // onMoveEnd={(map) => {
      //   console.log('获取中心点:', map.getCenter())
      // }}
      // 自定义获取地址和定位
      getAddress={getAddress}
      getLocation={getLocation}
      // 基准路径
      iconOptions={{
        imagePath: 'https://res.waiqin365.com/d/seedsui/leaflet/images/'
      }}
      {...props}
      onLoad={() => {
        // value没值时，开启自动定位，则先定位
        if (readOnly || !autoLocation || value?.address) return

        // 当前位置
        handleAutoLocation()
      }}
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
      <CenterMarker
        icon={Icon.getIcon(Icon.centerIconOptions)}
        longitude={value?.longitude}
        latitude={value?.latitude}
        onDragEnd={
          readOnly
            ? null
            : async (map) => {
                let center = map.getCenter()
                let result = {
                  ...center
                }

                Loading.show()
                let address = await map.getAddress(center)
                Loading.hide()

                if (typeof address === 'object') {
                  result = { ...result, ...address }
                }
                setValue(result)

                onChange && onChange(result)
              }
        }
      />

      {/* 标注点 */}
      {!readOnly ? <Markers points={points} onClick={onMarkClick} /> : null}

      {/* 缩放控件 */}
      <ZoomControl
        ref={zoomRef}
        style={{ bottom: readOnly ? '105px' : '135px' }}
        onZoomIn={(map) => {
          setTimeout(() => {
            console.log('放大', map.getZoom())
          }, 300)
        }}
        onZoomOut={(map) => {
          setTimeout(() => {
            console.log('缩小', map.getZoom())
          }, 300)
        }}
      />

      {/* 定位控件 */}
      {readOnly ? null : (
        <LocationControl
          ref={locationRef}
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
        ref={nearbyRef}
        readOnly={readOnly}
        value={value}
        radius={1000}
        onChange={(item) => {
          // console.log('选中点:', item)
          onChange && onChange(item)
        }}
        onLoad={(list) => {
          // 间距调整
          let bottom = nearbyRef.current.rootDOM.clientHeight
          if (bottom) {
            bottom = bottom + 20 + 'px'
            if (locationRef.current?.rootDOM) locationRef.current.rootDOM.style.bottom = bottom
            if (zoomRef.current?.rootDOM) zoomRef.current.rootDOM.style.bottom = bottom
          }
          setPoints(list)
        }}
      />
    </MapContainer>
  )
}

export default forwardRef(MarkPoint)
