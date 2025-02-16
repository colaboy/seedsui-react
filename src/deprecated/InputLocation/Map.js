import React, { Fragment } from 'react'
import MapView from './../MapView'
import MapChoose from './../MapChoose'

// 地图组件
const Map = function ({
  // 地图选择参数
  readOnly,
  type,
  onChange,
  // 预览地图参数
  ak,
  show,
  viewMapData,
  portal,
  onHide,
  mapPageProps
}) {
  return (
    <Fragment>
      {readOnly && (
        <MapView
          ak={ak}
          show={show}
          header={
            viewMapData && viewMapData.address ? (
              <div className="map-bar border-b">{viewMapData.address}</div>
            ) : null
          }
          points={viewMapData && viewMapData.point ? [viewMapData.point] : null}
          portal={document.getElementById('root') || document.body}
          onHide={onHide}
          {...(mapPageProps || {})}
        />
      )}
      {!readOnly && type === 'choose' && (
        <MapChoose
          ak={ak}
          show={show}
          autoLocation
          point={viewMapData && viewMapData.point ? viewMapData.point : null}
          address={viewMapData && viewMapData.address ? viewMapData.address : null}
          portal={document.getElementById('root') || document.body}
          onHide={onHide}
          onChange={onChange}
          {...(mapPageProps || {})}
        />
      )}
    </Fragment>
  )
}

export default Map
