import React, { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react'

import MapContainer from './../../components/MapContainer'
import ZoomControl from './../../components/ZoomControl'
import SearchControl from './../../components/SearchControl'
import CenterMarker, { createIcon as createCenterMarkerIcon } from './../../components/CenterMarker'
import LocationControl from './../../components/LocationControl'
import NearbyControl from './../../components/NearbyControl'
import Markers from './../../components/Markers'

// 内库使用
import Toast from './../../../Toast'
import Loading from './../../../Loading'
import locale from './../../../locale'

// 测试使用
// import { Loading, Toast, locale } from 'seedsui-react'

// 地图选点
function MapChoose(
  {
    readOnly,
    autoLocation = true,
    // 获取定位和地址工具类
    getAddress,
    getLocation,
    queryNearby,
    // value: {latitude: '纬度', longitude: '经度', address: '地址'}
    value: externalValue,
    onLoad,
    onChange,
    onMarkerClick,

    // Control Props
    SearchControlProps,
    CenterMarkerProps,
    MarkersProps,
    ZoomControlProps,
    LocationControlProps,
    NearbyControlProps,

    children,
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
  let [value, setValue] = useState(externalValue)

  // Marker
  let [points, setPoints] = useState(null)

  // 节点
  useImperativeHandle(ref, () => {
    return mapRef?.current
  })

  useEffect(() => {
    if (JSON.stringify(externalValue) === JSON.stringify(value)) return
    debugger
    setValue(externalValue)
    // eslint-disable-next-line
  }, [JSON.stringify(externalValue)])

  // 获取当前位置
  async function handleAutoLocation() {
    // 默认选中当前位置
    Loading.show({ content: locale('定位中...', 'SeedsUI_positioning') })
    let result = await mapRef.current?.getLocation?.()
    result = await mapRef.current?.getAddress?.(result)
    Loading.hide()

    if (typeof result === 'string') {
      Toast.show({
        content: result
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
      queryNearby={queryNearby}
      {...props}
      onLoad={(map) => {
        // value没值时，开启自动定位，则先定位
        if (typeof map === 'string') return
        onLoad && onLoad(map)

        // 当前位置
        if (readOnly || !autoLocation || value?.address) return
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
        {...SearchControlProps}
      />

      {/* 中心标注点: 仅用于显示 */}
      <CenterMarker
        icon={createCenterMarkerIcon(value?.icon)}
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

                Loading.show({ content: locale('获取地址中...', 'SeedsUI_getting_address') })
                result = await map.getAddress(result)
                Loading.hide()

                setValue(result)

                onChange && onChange(result)
              }
        }
        {...CenterMarkerProps}
      />

      {/* 标注点 */}
      {!readOnly ? <Markers points={points} onClick={onMarkerClick} {...MarkersProps} /> : null}

      {/* 缩放控件 */}
      <ZoomControl
        ref={zoomRef}
        style={{ bottom: readOnly ? '115px' : '145px' }}
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
        {...ZoomControlProps}
      />

      {/* 定位控件 */}
      {readOnly ? null : (
        <LocationControl
          ref={locationRef}
          style={{ bottom: '145px' }}
          onChange={(result) => {
            // console.log('定位完成:', result)
            setValue(result)

            onChange && onChange(result)
          }}
          {...LocationControlProps}
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
          // 间距调整, 附件面板的高度在展开后会很高会出问题
          // let bottom = nearbyRef.current.rootDOM.clientHeight
          // if (bottom) {
          //   bottom = bottom + 20 + 'px'
          //   if (locationRef.current?.rootDOM) locationRef.current.rootDOM.style.bottom = bottom
          //   if (zoomRef.current?.rootDOM) zoomRef.current.rootDOM.style.bottom = bottom
          // }
          setPoints(list)
        }}
        {...NearbyControlProps}
      />

      {children}
    </MapContainer>
  )
}

export default forwardRef(MapChoose)
