import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'
import {
  activeItemTarget,
  gcjToBdPoint,
  bdToGcjCoord,
  addMarkers,
  centerMarker,
  centerToPoint,
  initMap,
  clearMarkers
} from './../utils'
import formatValue from './formatValue'

import Control from './Control'
import Search from './Search'
import Current from './Current'
import Nearby from './Nearby'

// 测试使用
// import { Loading, Layout, Notice } from 'seedsui-react'
// 内库使用
import Loading from './../../../Loading'
import Layout from './../../../Layout'
import Notice from './../../../Notice'

// 地图位置选择
const MapChoose = forwardRef(
  (
    {
      autoLocation,
      readOnly,
      value,
      onChange,
      geocoder,
      // 标注配置
      markerConfig,
      /*
      point: {
        size: [w,h],
        imageUrl: ''
      }
      select: 同point
      */
      // 渲染
      footerRender,
      ...props
    },
    ref
  ) => {
    // 根节点
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.rootDOM,
        getRootDOM: rootRef?.current?.getRootDOM
      }
    })

    let [map, setMap] = useState(null)
    // 当前位置点
    const currentRef = useRef(null)
    let [current, setCurrent] = useState({ ...value })

    // 选中位置点
    const selectedMarkerRef = useRef(null)
    // 定位控件
    const locationRef = useRef(null)
    // 拖拽临时显示中心点
    const centerMarkerRef = useRef(null)
    // 附近推荐
    const nearByRef = useRef(null)

    // 容器
    const containerRef = useRef(null)

    // 错误
    const [errMsg, setErrMsg] = useState(false)

    useEffect(() => {
      initData()
    }, []) // eslint-disable-line

    // 废弃（会导致选中触发更新，则先不中item）如果value值和current值不一致则使用value作为当前点
    // useEffect(() => {
    //   if (!value?.longitude || !value?.latitude) return
    //   if (
    //     Number(value?.longitude || 0) !== Number(current?.longitude || 0) ||
    //     Number(value?.latitude || 0) !== Number(current?.latitude || 0)
    //   ) {
    //     handleLocation(value, { type: 'gcj02' })
    //   }
    //   // eslint-disable-next-line
    // }, [value])

    // 初始化地图
    async function initData() {
      // 没有值时先调用定位
      if (!value || !value.longitude || !value.latitude) {
        if (autoLocation && locationRef.current) {
          let locationResult = await locationRef.current.getLocation()
          // eslint-disable-next-line
          value = locationResult
          onChange && onChange(value)
          setCurrent(value)
        }
      }

      // 默认选中当前项
      if (currentRef.current) {
        activeItemTarget(currentRef.current)
      }

      // 初始化地图
      // eslint-disable-next-line
      let bdMap = await initMap(
        containerRef.current,
        value?.longitude && value?.latitude
          ? {
              center: gcjToBdPoint([value?.longitude, value?.latitude])
            }
          : null
      )
      if (typeof bdMap === 'string') {
        setErrMsg(bdMap)
        return
      }
      map = bdMap
      map.markerConfig = markerConfig
      setMap(map)

      // 绘制当前点
      if (value?.longitude && value?.latitude) {
        let point = [value.longitude, value.latitude]
        let marker = addSelectedMarker(point, 'gcj02')
        centerToPoint(marker.point, { map: map })
      }

      if (readOnly) return
      // 事件监听
      map.addEventListener(
        'dragstart',
        () => {
          if (selectedMarkerRef.current) {
            clearMarkers([selectedMarkerRef.current], { map: map })
          }
          centerMarkerRef.current?.classList?.remove?.('hide')
        },
        false
      )
      map.addEventListener(
        'zoomend',
        async () => {
          centerMarkerRef.current?.classList?.add?.('hide')
          // 获取中心点
          Loading.show()
          let newValue = await centerMarker({ map: map })
          Loading.hide()
          if (typeof newValue === 'string') return

          // 绘制当前点
          handleLocation(newValue)
        },
        false
      )
      map.addEventListener(
        'dragend',
        // 旧版babel不支持直接在监听中使用async，所以再包一层
        () => {
          handleDragend()
        },
        false
      )
    }

    // 拖动点结束
    async function handleDragend() {
      centerMarkerRef.current?.classList?.add?.('hide')
      // 绘制中心点
      Loading.show()
      let newValue = await centerMarker({ map: map })
      Loading.hide()
      if (typeof newValue === 'string') return

      // 绘制当前点
      handleLocation(newValue)
    }

    // 绘制当前点
    function addSelectedMarker(point, type) {
      if (selectedMarkerRef.current) {
        clearMarkers([selectedMarkerRef.current], { map: map })
      }
      let marker = addMarkers([point], {
        map: map,
        type: type,
        color: 'select',
        zIndex: 20010086
      })
      selectedMarkerRef.current = marker?.[0] || null
      return selectedMarkerRef.current
    }

    // 定位到当前位置
    function centerToValue() {
      if (value && value.longitude && value.latitude) {
        centerToPoint([value.longitude, value.latitude], { map: map, type: 'gcj02' })
      }
    }

    // 修改位置
    function handleLocation(newValue, opt) {
      const { type, updateNearby } = opt || {}
      // 绘制标记点
      if (newValue && newValue.latitude && newValue.longitude) {
        let point = [newValue.longitude, newValue.latitude]
        addSelectedMarker(point, type)
      }

      // 一律转成国测局坐标
      // eslint-disable-next-line
      value = { ...newValue }
      if (type !== 'gcj02') {
        let point = bdToGcjCoord([value.longitude, value.latitude])
        value.longitude = point[0]
        value.latitude = point[1]
      }
      onChange && onChange(formatValue(value))

      // 地图定位到中间
      centerToValue()

      // 非点击附近时, 需要更新附近
      if (updateNearby !== false && nearByRef.current) {
        // 非点击附近时需要更新current
        setCurrent(value)
        if (currentRef.current) {
          activeItemTarget(currentRef.current)
        }

        if (nearByRef.current.timeout) {
          clearTimeout(nearByRef.current.timeout)
        }
        nearByRef.current.timeout = setTimeout(() => {
          nearByRef?.current?.reload()
        }, 1000)
      }
    }

    return (
      <Layout
        ref={rootRef}
        safeArea
        {...props}
        className={`location-page-mappage${readOnly ? ' preview' : ' choose'}${
          props?.className ? ' ' + props.className : ''
        }`}
      >
        {/* 全屏搜索 */}
        {!readOnly && <Search map={map} onChange={handleLocation} />}

        {/* 地图 */}
        <div className="mappage-main">
          {/* 地图 */}
          <div ref={containerRef} className={`mappage-container`}></div>

          {/* 中心点 */}
          <Control.CenterMarker ref={centerMarkerRef} />

          {/* 底部 */}
          <div className="mappage-bottom-container">
            <div className="mappage-controls">
              {/* 定位 */}
              {!readOnly && (
                <Control.Location
                  ref={locationRef}
                  map={map}
                  value={value}
                  onChange={handleLocation}
                  geocoder={geocoder}
                />
              )}
              <div></div>
              {/* 放大缩小 */}
              <Control.Zoom map={map} />
            </div>
            {/* 位置信息面板 */}
            <div className="mappage-info-card">
              {/* 当前位置 */}
              <Current
                ref={currentRef}
                readOnly={readOnly}
                map={map}
                current={current}
                onChange={handleLocation}
              />
              {/* 附近位置 */}
              {!readOnly && map && <Nearby ref={nearByRef} map={map} onChange={handleLocation} />}
            </div>
          </div>
        </div>
        {footerRender && footerRender()}
        {errMsg && <Notice caption={errMsg} style={{ top: '48px' }} />}
      </Layout>
    )
  }
)

export default MapChoose
