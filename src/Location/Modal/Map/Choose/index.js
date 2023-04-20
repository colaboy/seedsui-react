import React, { useRef, useEffect, useState } from 'react'
import {
  bdToGcjCoord,
  addMarkers,
  centerMarker,
  centerToPoint,
  initMap,
  clearMarkers
} from './../utils'
import Loading from './../../../../Loading'
import Layout from './../../../../Layout'
import Notice from './../../../../Notice'
import locale from './../../../../locale'
import Control from './../Control'
import Search from './Search'
import Nearby from './Nearby'

function MapChoose({ readOnly, value: originValue = null, onChange, ...props }) {
  let [map, setMap] = useState(null)
  // 当前位置点
  const currentMarkerRef = useRef(null)
  // 拖拽临时显示中心点
  const centerMarkerRef = useRef(null)
  // 附近推荐
  const nearByRef = useRef(null)

  // 容器
  const containerRef = useRef(null)

  // 经纬度
  let [value, setValue] = useState(originValue)

  // 错误
  const [errMsg, setErrMsg] = useState(false)

  useEffect(() => {
    setValue(originValue)
  }, [JSON.stringify(originValue)]) // eslint-disable-line

  useEffect(() => {
    initData()
  }, []) // eslint-disable-line

  // 初始化地图
  async function initData() {
    // 初始化地图
    // eslint-disable-next-line
    let bdMap = await initMap(containerRef.current)
    if (typeof bdMap === 'string') {
      setErrMsg(bdMap)
      return
    }
    map = bdMap
    setMap(map)

    // 绘制当前点
    if (value?.longitude && value?.latitude) {
      let point = [value.longitude, value.latitude]
      let marker = addCurrentMarker(point)
      centerToPoint(marker.point, { map: map })
    }

    if (readOnly) return
    // 事件监听
    map.addEventListener(
      'dragstart',
      () => {
        centerMarkerRef.current.classList.remove('hide')
      },
      false
    )
    map.addEventListener(
      'zoomend',
      async () => {
        centerMarkerRef.current.classList.add('hide')
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
      async () => {
        centerMarkerRef.current.classList.add('hide')
        // 绘制中心点
        Loading.show()
        let newValue = await centerMarker({ map: map })
        Loading.hide()
        if (typeof newValue === 'string') return

        // 绘制当前点
        handleLocation(newValue)
      },
      false
    )
  }

  // 绘制当前点
  function addCurrentMarker(point, type) {
    if (currentMarkerRef.current) {
      clearMarkers([currentMarkerRef.current], { map: map })
    }
    let marker = addMarkers([point], {
      map: map,
      type: type,
      color: 'red',
      zIndex: 20010086
    })
    currentMarkerRef.current = marker?.[0] || null
    return currentMarkerRef.current
  }

  // 定位到当前位置
  function centerToCurrent() {
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
      addCurrentMarker(point, type)
      setTimeout(() => {
        centerToCurrent()
      }, 200)
    }

    // 一律转成国测局坐标
    value = { ...newValue }
    if (type !== 'gcj02') {
      let point = bdToGcjCoord([value.longitude, value.latitude])
      value.longitude = point[0]
      value.latitude = point[1]
    }
    setValue(value)

    // 更新附近
    if (updateNearby !== false && nearByRef.current) {
      nearByRef.current.reload()
    }
  }

  // 点击确定
  function handleSubmit() {
    if (onChange) onChange(value)
  }

  return (
    <Layout {...props}>
      <Search map={map} onChange={handleLocation} />
      <div className="flex-1 position-relative">
        <div ref={containerRef} className={`mappage-container`}></div>
        <Control.Location map={map} value={value} onChange={handleLocation} />
        <Control.CenterMarker ref={centerMarkerRef} />
      </div>
      <Layout.Footer>
        <div className="mappage-list-item border-b">
          <div className="mappage-list-item-prefix">
            <i className="icon mappage-icon-current"></i>
          </div>
          <div className="mappage-list-item-content">
            <p className="mappage-list-item-content-title">
              {locale('当前位置', 'current_location')}
            </p>
            <p className="mappage-list-item-description">{value?.value || ''}</p>
          </div>
          {value?.value && (
            <span className="mappage-list-item-submit" onClick={handleSubmit}>
              {locale('确定', 'ok')}
            </span>
          )}
        </div>
        {!readOnly && map && <Nearby ref={nearByRef} map={map} onChange={handleLocation} />}
      </Layout.Footer>
      {errMsg && <Notice caption={errMsg} style={{ top: '48px' }} />}
    </Layout>
  )
}
export default MapChoose
