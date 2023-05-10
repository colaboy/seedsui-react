import React, { useImperativeHandle, forwardRef } from 'react'
import { getLocation } from './../utils'
import Loading from './../../../../Loading'
import Toast from './../../../../Toast'

// 悬浮定位控件
function Location({ map, value, onChange, ...props }, ref) {
  useImperativeHandle(ref, () => {
    return {
      getLocation: location
    }
  })

  // 定位
  function location() {
    // eslint-disable-next-line
    return new Promise(async (resolve) => {
      Loading.show()
      let result = await getLocation()
      resolve(result)
      Loading.hide()
    })
  }

  // 点击定位
  async function handleLocation() {
    if (!map) return
    let result = await location()
    // 定位出错
    if (typeof result === 'string') {
      Toast.show({ content: result })
      return
    }
    // 视图更新
    if (onChange) onChange(result, { type: 'gcj02' })
  }

  return (
    <div
      {...props}
      className={`mappage-location${props.className ? ' ' + props.className : ''}`}
      onClick={handleLocation}
    >
      <div className={`mappage-location-icon`}></div>
    </div>
  )
}

export default forwardRef(Location)
