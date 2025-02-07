import React from 'react'
import { AssetUtil } from 'seedsui-react'

export default () => {
  function handleLoadJsByCallback() {
    AssetUtil.loadJs('//res.waiqin365.com/d/seedsui/plugin/leaflet/js/leaflet.js', {
      id: 'leaflet-js',
      success: () => {
        alert('Js load succeeded')
      },
      fail: () => {
        alert('Js load failed')
      }
    })
  }
  async function handleLoadJsByAsync() {
    let isOk = await AssetUtil.loadJs(
      '//res.waiqin365.com/d/seedsui/plugin/leaflet/js/leaflet.js',
      {
        id: 'leaflet-js'
      }
    )
    if (isOk) {
      alert('Js load succeeded')
    } else {
      alert('Js load failed')
    }
  }
  return (
    <>
      <div onClick={handleLoadJsByCallback}>Load js by callback</div>
      <div onClick={handleLoadJsByAsync}>Load js by async</div>
    </>
  )
}
