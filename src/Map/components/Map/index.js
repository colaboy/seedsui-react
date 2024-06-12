import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import createMap from './createMap'
import injectChildrenProps from './injectChildrenProps'

import Result from './../Result'

const Map = forwardRef(
  (
    {
      center = {
        latitude: 51.505,
        longitude: 0.09
      },
      zoom,
      minZoom,
      maxZoom,
      children,
      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const [map, setMap] = useState(null)

    // 节点
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current,
        map: map,
        setView: map?.setView,
        panTo: (latlng) => {
          if (!map || !latlng.latitude || !latlng.longitude) return
          map.panTo([latlng.latitude, latlng.longitude])
        },
        zoomIn: map?.zoomIn,
        zoomOut: map?.zoomOut
      }
    })

    useEffect(() => {
      loadData()
      // eslint-disable-next-line
    }, [])

    // 加载
    async function loadData() {
      // Load map resource
      const map = createMap(rootRef.current.querySelector('.map-container'), {
        center,
        zoom,
        minZoom,
        maxZoom
      })
      setMap(map)

      // Load map failed
      if (typeof map === 'string') {
        return
      }

      // record map object
      rootRef.current.map = map
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
      newChildren = injectChildrenProps(children, {
        map: map
      })
    }

    return (
      <div
        {...props}
        className={'map' + (props.className ? ' ' + props.className : '')}
        ref={rootRef}
      >
        {/* 地图容器 */}
        <div className="map-container"></div>
        {/* 其它控件 */}
        {newChildren}
      </div>
    )
  }
)

export default Map
