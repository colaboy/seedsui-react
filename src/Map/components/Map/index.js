import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import createMap from './createMap'

const Map = forwardRef(({ children, ...props }, ref) => {
  const rootRef = useRef(null)
  const [map, setMap] = useState(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current,
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
    if (typeof map === 'string') {
      setMap(map)
      return
    }
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

  if (!map || typeof map === 'string') {
  }
  return (
    <div
      {...props}
      className={'map' + (props.className ? ' ' + props.className : '')}
      ref={rootRef}
    >
      {map ? '' : children}
    </div>
  )
})

export default Map
