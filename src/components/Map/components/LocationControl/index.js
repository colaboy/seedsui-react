import React, { useImperativeHandle, forwardRef, useRef } from 'react'

// 内库使用-start
import locale from './../../../../utils/locale'
import Loading from './../../../Loading'
import Toast from './../../../Toast'
// 内库使用-end

// 测试使用-start
// import { locale, Loading, Toast } from 'seedsui-react'
// 测试使用-end

// 定位控件
function LocationControl({ map, onChange, ...props }, ref) {
  // 容器
  const rootRef = useRef(null)

  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current,
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
      // 当前位置
      let result = await map.getLocation({ type: 'wgs84' })
      result = await map.getAddress(result)

      // Location success but value no change
      if (typeof result !== 'string') {
        map.panTo(result)
      }

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
      ref={rootRef}
      className={`map-locationControl${props.className ? ' ' + props.className : ''}`}
      onClick={handleLocation}
    >
      <div className={`map-locationControl-icon`}></div>
    </div>
  )
}

export default forwardRef(LocationControl)
