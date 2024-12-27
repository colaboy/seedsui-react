import React, { useRef, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import MapUtil from './../MapUtil'
import Page from './../Page'
import Header from './../Header'
import Container from './../Container'
import Notice from './../Notice'
import Bridge from './../../utils/Bridge'
import Wrapper from './Wrapper'
import Close from './Close'
import MapInstance from './MapInstance'
import Context from './../Context/instance.js'

function MapView({
  ak, // 百度地图key
  show = true, // 百度地图不能移除DOM, 再渲染
  portal,
  title,
  prevTitle,
  onHide,
  // 其它属性
  center = '江苏省,南京市',
  // 标记点
  points, // [[118.798128, 31.968592], [118.619429,32.113449]] => 南京南站, 老山
  // 圆形
  circle, // {point: [118.798128, 31.968592], radius: 1000} => 南京南站
  // 多边形
  polygon, // [[lng, lat], [lng, lat]]
  // 地区
  district, // {province: {id: "320000", name: "江苏"}, city: {id: "320100", name: "南京市"}, district: {id: "320105", name: "建邺区"}}
  // 子元素
  header,
  children,
  ...others
}) {
  let [mapInstance, setMapInstance] = useState(null)
  // context
  const context = useContext(Context) || {}
  const locale =
    context.locale ||
    function (remark) {
      return remark || ''
    }

  const refWrapperEl = useRef(null)
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    if (!window.BMap && !ak) {
      setErrMsg(locale('请传入百度地图ak', 'SeedsUI_no_bdmap_ak'))
      return
    }
    MapUtil.load({
      ak: ak,
      success: () => {
        initData()
      },
      fail: () => {
        setErrMsg(locale('地图库加载失败, 请稍后再试', 'SeedsUI_map_js_load_failed'))
      }
    })
    // 移除组件时注销
    return () => {
      // 设置上一页标题
      handleTitle(prevTitle)
      // 移除实例化对象
      mapInstance.destroy()
    }
  }, []) // eslint-disable-line

  // 隐藏时, 移除标注
  // useEffect(() => {
  //   if (show === false) {
  //     mapInstance.destroy();
  //   }
  // }, [show])

  // 初始化地图
  function initData() {
    if (!window.BMap) {
      // 如果有高德地图, 则加上 || !window.AMap
      setErrMsg(locale('地图库加载失败, 请稍后再试', 'SeedsUI_map_js_load_failed'))
      return
    }
    console.log('初始化地图' + center)
    if (!refWrapperEl.current) {
      setErrMsg(locale('地图容器不存在', 'SeedsUI_no_mapcontainer_error'))
      return
    }
    mapInstance = new MapInstance()
    setMapInstance(mapInstance)
    mapInstance.initMap(refWrapperEl.current, center, (result) => {
      if (typeof result === 'string') {
        setErrMsg(result)
        return
      }
    })
  }

  // 绘制标记点
  useEffect(() => {
    if (points && points.length && show && mapInstance) {
      console.log('绘制标记')
      console.log(mapInstance)
      mapInstance.drawMarkers(points)
    }
  }, [points]) // eslint-disable-line

  // 绘制圆形
  useEffect(() => {
    if (circle && circle.point && show) {
      console.log('绘制圆形')
      mapInstance.drawCircle(circle.point, circle.radius)
    }
  }, [circle]) // eslint-disable-line

  // 绘制多边形
  useEffect(() => {
    if (polygon && show) {
      console.log('绘制多边形')
      mapInstance.drawPolygon(polygon)
    }
  }, [polygon]) // eslint-disable-line

  // 绘制地区
  useEffect(() => {
    if (district && show) {
      console.log('绘制区域')
      let districtName = []
      for (let name in district) {
        districtName.push(district[name].name)
      }
      mapInstance.drawDistrict(districtName.join(','))
    }
  }, [district]) // eslint-disable-line

  // 显隐
  useEffect(() => {
    if (show) {
      handleTitle(title)
    } else {
      handleTitle(prevTitle)
    }
    // eslint-disable-next-line
  }, [show])

  // 中断绘制
  useEffect(() => {
    if (show) {
      if (errMsg) {
        mapInstance.abort = true
      } else {
        mapInstance.abort = false
      }
    }
    // eslint-disable-next-line
  }, [errMsg])

  // 设置标题
  function handleTitle(title) {
    if (!title) return
    if (typeof title === 'string') {
      Bridge.setTitle({
        title: title
      })
    } else if (typeof title === 'function') {
      title()
    }
  }

  const DOM = (
    <Page
      {...others}
      className={(show ? '' : 'hide') + (others?.className ? ' ' + others.className : '')}
    >
      {header && <Header>{header}</Header>}
      <Container>
        <Wrapper ref={refWrapperEl} />
        {onHide && <Close onClick={onHide} />}
        {children}
      </Container>
      {errMsg && <Notice caption={errMsg} />}
    </Page>
  )
  if (portal) {
    return createPortal(DOM, portal)
  }
  return DOM
}
export default MapView
