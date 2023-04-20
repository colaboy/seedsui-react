import React from 'react'
import { centerToPoint, getLocation } from './../utils'
import Loading from './../../../../Loading'
import Toast from './../../../../Toast'

// 悬浮定位控件
function Location({ map, value, onChange, ...props }) {
  async function handleLocation() {
    if (!map) return
    Loading.show()
    let result = await getLocation()
    Loading.hide()
    // 定位出错
    if (typeof result === 'string') {
      Toast.show(err.errMsg, { maskClickable: true })
      return
    }
    // 视图更新
    if (onChange) onChange(result)
  }
  return (
    <div
      {...props}
      className={`map-location${props.className ? ' ' + props.className : ''}`}
      onClick={handleLocation}
    >
      <div className={`map-location-icon`}></div>
    </div>
  )
}

export default Location
