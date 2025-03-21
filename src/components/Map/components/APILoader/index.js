import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import loadSource from './../../utils/loadSource'
import canvasMarkers from './leaflet.canvas-markers'
import MapContext from './../MapContext'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Result from './../../../Result'
import Button from './../../../Button'
// 内库使用-end

// 测试使用-start
// import { LocaleUtil, Result, Button } from 'seedsui-react'
// 测试使用-end

// Load map js and css source
const APILoader = forwardRef(
  (
    {
      config,
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
      // 保持单例
      if (config?.key && config?.type) {
        window.APILoaderConfig = config
      }
      // 没有设置config，则读取默认配置
      else if (window.APILoaderConfig) {
        // eslint-disable-next-line
        config = window.APILoaderConfig
      }

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
      return (
        <Result title={errMsg} className="map-container-result" status={'500'}>
          <Button
            className="result-button primary"
            onClick={() => {
              loadData()
            }}
          >
            {LocaleUtil.locale('重试', 'SeedsUI_retry')}
          </Button>
        </Result>
      )
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
    return <MapContext.Provider value={config}>{children}</MapContext.Provider>
  }
)

export default APILoader
