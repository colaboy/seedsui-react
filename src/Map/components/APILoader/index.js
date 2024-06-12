import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import loadSource from './loadSource'

import Result from './../Result'

// Load map js and css source
const APILoader = forwardRef(
  (
    {
      config = {
        key: '',
        // 使用哪个地图
        type: '', // 'osm' | 'google' | 'amap' || 'bmap'
        // 使用哪个地图的瓦片图层
        typeTileLayer: false
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
      setErrMsg(isOk)
      if (typeof isOk === 'string') {
        onError && onError(isOk)
      } else {
        onSuccess && onSuccess(isOk)
      }
    }

    // 未加载完成显示空
    if (errMsg === null) {
      return null
    }

    // 加载失败
    if (typeof errMsg === 'string') {
      return <Result title={errMsg} />
    }

    // 加载成功
    return children
  }
)

export default APILoader
