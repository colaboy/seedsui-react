import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import createMap from './createMap'

import Result from './../Result'

const Map = forwardRef(({ children, ...props }, ref) => {
  const rootRef = useRef(null)
  const [map, setMap] = useState(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current,
      map: map,
      zoomIn: () => {},
      zoomOut: () => {}
    }
  })

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [])

  // 加载
  async function loadData() {
    // Load map resource
    const map = createMap(rootRef.current)
    setMap(map)

    // Load map failed
    if (typeof map === 'string') {
      return
    }

    // record map object
    rootRef.current.map = map
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

  let newChildren = null
  // 未加载完成显示空
  if (!map) {
    newChildren = null
  }
  // 加载失败
  else if (typeof map === 'string') {
    newChildren = <Result title={errMsg} />
  }
  // 加载成功
  else {
    newChildren = React.cloneElement(children, {
      map: map
    })
  }

  return (
    <div
      {...props}
      className={'map' + (props.className ? ' ' + props.className : '')}
      ref={rootRef}
    >
      {newChildren}
    </div>
  )
})

export default Map
