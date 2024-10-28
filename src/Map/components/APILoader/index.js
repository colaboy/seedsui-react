import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
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
      // 自定义Loading
      loading,
      onError,
      onSuccess,
      children
    },
    ref
  ) => {
    const [errMsg, setErrMsg] = useState(null)

    const APIRef = useRef({
      reload: loadData
    })

    // 节点
    useImperativeHandle(ref, () => {
      return APIRef.current
    })

    useEffect(() => {
      loadData()
      // eslint-disable-next-line
    }, [])

    // 加载
    async function loadData() {
      // Load map resource
      let result = await loadSource(config)
      let isOk = true
      if (typeof result === 'object' && result?.errCode) {
        isOk = result?.errMsg
        // 自定义处理错误
        if (onError) {
          let newIsOk = await onError({ ...{}, ...result, ...APIRef.current })
          if (newIsOk !== undefined) {
            isOk = newIsOk
          }
        }
      } else {
        onSuccess && onSuccess(APIRef.current)
      }
      setErrMsg(isOk)
    }

    // 未加载完成显示空
    if (errMsg === null) {
      if (React.isValidElement(loading)) {
        return <loading />
      }
      if (typeof loading === 'function') {
        return loading()
      }
      return null
    }

    // 加载失败
    if (typeof errMsg === 'string') {
      return <Result title={errMsg} retry={loadData} />
    }

    // 渲染自定义DOM
    if (errMsg && React.isValidElement(errMsg)) {
      return errMsg
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
