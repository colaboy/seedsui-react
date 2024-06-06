import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { loadGoogle, loadGoogleMutant, loadLeaflet } from './utils'

const Map = forwardRef(({ children, ...others }, ref) => {
  const rootRef = useRef(null)
  const [errMsg, setErrMsg] = useState(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [])

  // 加载
  async function loadData() {
    // Load map resource
    let isOk = await loadLeaflet()
    if (typeof isOk === 'string') {
      setErrMsg(isOk)
      return
    }
    isOk = await loadGoogle()
    if (typeof isOk === 'string') {
      setErrMsg(isOk)
      return
    }
    isOk = await loadGoogleMutant()
    if (typeof isOk === 'string') {
      setErrMsg(isOk)
      return
    }

    const map = window.L.map('map', { attributionControl: false }).setView([51.505, -0.09], 13)

    // 渲染瓦片图层, 如果访问不了https://tile.openstreetmap.org, 可以换成天地图http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=xxx
    // const tiles = window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 19,
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(map)

    // 渲染谷歌地图
    var road = window.L.gridLayer.googleMutant({ type: 'roadmap' }).addTo(map)
    const tiles = window.L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: ''
    })

    /*
    
    const marker = window.L.marker([51.5, -0.09])
      .addTo(map)
      .bindPopup('<b>Hello world!</b><br />I am a popup.')
      .openPopup()
    const circle = window.L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    })
      .addTo(map)
      .bindPopup('I am a circle.')
    const polygon = window.L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
    ])
      .addTo(map)
      .bindPopup('I am a polygon.')
    
    const popup = window.L.popup()
      .setLatLng([51.513, -0.09])
      .setContent('I am a standalone popup.')
      .openOn(map)
    
    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at ${e.latlng.toString()}`)
        .openOn(map)
    }
    map.on('click', onMapClick)
    */
  }

  return (
    <div
      id="map"
      {...others}
      className={'map' + (others.className ? ' ' + others.className : '')}
      ref={rootRef}
    >
      {errMsg || ''}
    </div>
  )
})

export default Map
