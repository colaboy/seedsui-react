import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import loadSource from './../../utils/loadSource'
import canvasMarkers from './leaflet.canvas-markers'

import Result from './../Result'

// Load map js and css source
const APILoader = forwardRef(
  (
    {
      config = {
        key: '',
        // 使用哪个地图
        type: '' // 'osm' | 'google' | 'amap' || 'bmap'
      },
      onError,
      onSuccess,
      children
    },
    ref
  ) => {
    const [errMsg, setErrMsg] = useState(null)

    // 节点
    useImperativeHandle(ref, () => {
      return {
        reload: loadData
      }
    })

    useEffect(() => {
      loadData()
      // eslint-disable-next-line
    }, [])

    // 加载
    async function loadData() {
      // Load map resource
      const isOk = await loadSource(config)
      if (typeof isOk === 'string') {
        // 自定义处理错误
        if (onError) {
          let newIsOk = await onError(isOk)
          if (newIsOk !== undefined) {
            isOk = newIsOk
          }
        }
      } else {
        onSuccess && onSuccess(isOk)
      }
      setErrMsg(isOk)
    }

    // 未加载完成显示空
    if (errMsg === null) {
      return null
    }

    // 加载失败
    if (typeof errMsg === 'string') {
      return <Result title={errMsg} />
    }

    // Add leaflet plugin: canvas markers(window.L.canvasIconLayer)
    if (window.L) {
      canvasMarkers(window.L)
    }
    // require('leaflet-canvas-marker')

    // 加载成功
    return children
  }
)

export default APILoader
