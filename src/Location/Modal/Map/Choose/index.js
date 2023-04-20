import React, { useRef, useEffect, useState } from 'react'
import { addMarkers, centerMarker, centerToPoint, initMap } from './../utils'
import MapUtil from './../../../../MapUtil'
import Layout from './../../../../Layout'
import Notice from './../../../../Notice'
import locale from './../../../../locale'
import Control from './../Control'
import Search from './Search'
import Nearby from './Nearby'

function MapChoose({ ak, value: originValue = null, onChange, ...props }) {
  let [map, setMap] = useState(null)
  // 当前位置点
  const currentMarkerRef = useRef(null)
  // 选中点
  const checkMarkerRef = useRef(null)
  // 拖拽临时显示中心点
  const centerMarkerRef = useRef(null)
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
    if (!window.BMap && !ak) {
      setErrMsg(locale('请传入百度地图ak', 'hint_map_ak'))
      return
    }
    MapUtil.load({
      ak: ak,
      success: () => {
        initData()
      },
      fail: () => {
        setErrMsg(locale('地图库加载失败, 请稍后再试', 'hint_map_failed_load'))
      }
    })
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
      let markers = addMarkers([point], { map: map, type: 'gcj02' })
      centerToPoint(markers[0].point, { map: map })
    }

    // 事件监听
    map.addEventListener(
      'dragstart',
      () => {
        centerMarkerRef.current.classList.remove('hide')
        map.clearOverlays()
      },
      false
    )
    map.addEventListener(
      'zoomend',
      async () => {
        centerMarkerRef.current.classList.add('hide')
        // 绘制中心点
        let newValue = await centerMarker({ map: map })
        if (typeof newValue === 'string') return
        setValue(newValue)
      },
      false
    )
    map.addEventListener(
      'dragend',
      async () => {
        centerMarkerRef.current.classList.add('hide')
        // 绘制中心点
        let newValue = await centerMarker({ map: map })
        if (typeof newValue === 'string') return
        setValue(newValue)
      },
      false
    )
  }

  // 还原位置
  function centerToCurrent() {
    if (value && value.longitude && value.latitude) {
      centerToPoint([value.longitude, value.latitude], { map: map, type: 'gcj02' })
    }
  }

  // 修改位置
  function handleLocation(newValue) {
    value = newValue
    setValue(newValue)
    // 绘制标记点
    if (value && value.latitude && value.longitude) {
      let point = [value.longitude, value.latitude]
      map.clearOverlays()
      addMarkers([point], {
        map: map,
        type: 'gcj02'
      })
      setTimeout(() => {
        centerToCurrent()
      }, 200)
    }
  }

  // 点击确定
  function handleSubmit() {
    if (onChange) onChange(value)
  }

  return (
    <Layout {...props}>
      <Search map={map} onChange={handleLocation} />
      <Layout.Main>
        <div ref={containerRef} className={`map-container`}></div>
        <Control.Location map={map} value={value} onChange={handleLocation} />
        <Control.CenterMarker ref={centerMarkerRef} />
      </Layout.Main>
      <Layout.Footer className="map-footer">
        <div className="map-footer-content">
          <p className="map-footer-content-caption">{locale('当前位置', 'current_location')}</p>
          <p className="map-footer-content-sndcaption">{value?.value || ''}</p>
        </div>
        {value?.value && (
          <span className="map-footer-submit" onClick={handleSubmit}>
            {locale('确定', 'ok')}
          </span>
        )}
      </Layout.Footer>
      <Nearby />
      {errMsg && <Notice caption={errMsg} style={{ top: '48px' }} />}
    </Layout>
  )
}
export default MapChoose
