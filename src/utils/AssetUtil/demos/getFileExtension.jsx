import React from 'react'
import { AssetUtil } from 'seedsui-react'

export default () => {
  return (
    <>
      <div>{AssetUtil.getFileExtension('//res.waiqin365.com/d/seedsui/leaflet/js/leaflet.js')}</div>
      <div>{AssetUtil.getFileExtension('leaflet.pdf')}</div>
      <div>
        {AssetUtil.getFileExtension('//res.waiqin365.com/d/seedsui/leaflet/js/leaflet.image')}
      </div>
      <div>
        {AssetUtil.getFileExtension('//res.waiqin365.com/d/seedsui/leaflet/js/leaflet.') ||
          'No Extension'}
      </div>
      <div>{AssetUtil.getFileExtension('leaflet. a') || 'No Extension'}</div>
    </>
  )
}
