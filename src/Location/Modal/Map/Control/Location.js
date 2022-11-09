import React from 'react'
import Loading from './../../../../Loading'
import Toast from './../../../../Toast'

function Location({ instance, value, onChange, ...props }) {
  function handleLocation() {
    if (!instance.current) return
    Loading.show()
    instance.current.getLocation({
      onChange: (value) => {
        Loading.hide()
        if (!value) return
        // 视图更新
        instance.current.centerToPoint([value.longitude, value.latitude])
        if (onChange) onChange(value)
      },
      onError: (err) => {
        Loading.hide()
        Toast.show(err.errMsg, { maskClickable: true })
      }
    })
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
