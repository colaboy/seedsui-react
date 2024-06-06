import React, { useEffect, forwardRef, useImperativeHandle } from 'react'
import createTileLayer from './createTileLayer'

const TileLayer = forwardRef(({ map, ...props }, ref) => {
  useImperativeHandle(ref, () => {
    return {}
  })

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [])

  // 加载
  async function loadData() {
    createTileLayer(map)
  }

  return <></>
})

export default Map
