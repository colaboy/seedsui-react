import React, { useRef, useEffect, useState } from 'react'
import MapUtil from './../../../MapUtil'
import Page from './../../../Page'
import Container from './../../../Container'
import Footer from './../../../Footer'
import Notice from './../../../Notice'
import locale from './../../../locale'
import Instance from './instance'
import Control from './Control'

const center = '江苏省,南京市'

function MapView({ ak, value: argValue = null, onChange, ...props }) {
  const mapRef = useRef(null)
  const instance = useRef(null)
  let [value, setValue] = useState(argValue)
  const [loading, setLoading] = useState(true)
  const [errMsg, setErrMsg] = useState(false)

  useEffect(() => {
    setValue(argValue)
  }, [JSON.stringify(argValue)]) // eslint-disable-line

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
    // 移除组件时注销
    return () => {
      if (instance.current) {
        instance.current.destroy()
      }
    }
  }, []) // eslint-disable-line

  // 绘制标记点
  useEffect(() => {
    handleMarker()
  }, [loading]) // eslint-disable-line

  // 初始化地图
  function initData() {
    if (!window.BMap) {
      // 如果有高德地图, 则加上 || !window.AMap
      setErrMsg(locale('地图库加载失败, 请稍后再试', 'hint_map_failed_load'))
      return
    }
    console.log('初始化地图' + center)
    if (!mapRef.current) {
      setErrMsg(locale('地图容器不存在', 'hint_map_no_container'))
      return
    }
    const temp = new Instance()
    temp.initMap(mapRef.current, center, (result) => {
      if (typeof result === 'string') {
        setErrMsg(result)
        return
      }
      instance.current = temp
      // 拖拽选点
      instance.current.initDragPoint((newValue) => {
        if (newValue) {
          setValue(newValue)
        } else {
          handleReset()
        }
      })
      setErrMsg('')
      setLoading(false)
    })
  }

  // 绘制标记点
  function handleMarker() {
    if (instance.current && value && value.latitude && value.longitude) {
      let point = [value.longitude, value.latitude]
      instance.current.drawMarker(point)
      setTimeout(() => {
        handleReset()
      }, 200)
    }
  }

  // 还原位置
  function handleReset() {
    if (value && value.longitude && value.latitude) {
      instance.current.centerToPoint([value.longitude, value.latitude])
    }
  }

  // 修改位置
  function handleLocation(newValue) {
    value = newValue
    setValue(newValue)
    // 绘制标记点
    handleMarker()
  }

  // 点击确定
  function handleSubmit() {
    if (onChange) onChange(value)
  }

  return (
    <Page {...props}>
      <Container>
        <div ref={mapRef} className={`map-container`}></div>
        <Control.Location instance={instance} value={value} onChange={handleLocation} />
      </Container>
      <Footer className="map-footer">
        <div className="map-footer-content" onClick={handleReset}>
          <p className="map-footer-content-caption">{locale('当前位置', 'current_location')}</p>
          <p className="map-footer-content-sndcaption">{value?.value || ''}</p>
        </div>
        {value?.value && (
          <span className="map-footer-submit" onClick={handleSubmit}>
            {locale('确定', 'ok')}
          </span>
        )}
      </Footer>
      {errMsg && <Notice caption={errMsg} />}
    </Page>
  )
}
export default MapView
