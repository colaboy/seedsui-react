import React, { useImperativeHandle, forwardRef } from 'react'
import getLocation from './../../utils/getLocation'

// 测试使用
// import { locale, Loading, Toast } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'
import Loading from './../../../Loading'
import Toast from './../../../Toast'

// 定位控件
function LocationControl({ map, onChange, ...props }, ref) {
  useImperativeHandle(ref, () => {
    return {
      update: location
    }
  })

  // 定位
  function location() {
    // eslint-disable-next-line
    return new Promise(async (resolve) => {
      Loading.show({
        content: locale('定位中...', 'SeedsUI_positioning')
      })
      let result = await getLocation()
      resolve(result)
      Loading.hide()
    })
  }

  // 点击定位
  async function handleLocation() {
    let result = await location()
    // 定位出错
    if (typeof result === 'string') {
      Toast.show({ content: result })
      return
    }
    // 视图更新
    if (onChange) onChange(result)
  }

  return (
    <div
      {...props}
      className={`map-locationControl${props.className ? ' ' + props.className : ''}`}
      onClick={handleLocation}
    >
      <div className={`map-locationControl-icon`}></div>
    </div>
  )
}

export default forwardRef(LocationControl)
