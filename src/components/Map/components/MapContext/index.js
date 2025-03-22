import { createContext } from 'react'

// 创建 Context
const MapContext = createContext({
  key: '',
  // 使用哪个地图
  type: '', // 'osm' | 'google' | 'amap' || 'bmap'
  defaultCenterMarkerIconOptions: {
    iconUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-custom-shop.png`,
    iconRetinaUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-custom-shop.png`,
    shadowUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-shadow.png`,
    shadowRetinaUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-shadow.png`
  },
  defaultMarkerIconOptions: {
    iconUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-icon.png`,
    iconRetinaUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-icon-2x.png`,
    shadowUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-shadow.png`,
    shadowRetinaUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-shadow.png`
  },
  leaflet: {
    css: 'https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/css/leaflet.css',
    js: 'https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/js/leaflet.js'
  }
})

export default MapContext
