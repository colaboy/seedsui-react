import React from 'react'
import { Map as SMap } from 'seedsui-react'
const { APILoader, Map, TileLayer } = SMap

export default () => {
  return (
    <APILoader>
      <Map>
        <TileLayer />
      </Map>
    </APILoader>
  )
}
