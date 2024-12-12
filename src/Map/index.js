// 说明: Map使用leaflet绘制, 一律使用wgs84坐标, 只有在绘制瓦片和搜索时需要纠偏转坐标
// Utils
import coordsToWgs84 from './utils/coordsToWgs84'
import wgs84ToCoords from './utils/wgs84ToCoords'
import getAddress from './utils/getAddress'
import getLocation from './utils/getLocation'
import queryNearby from './utils/queryNearby'
// Components
import APILoader from './components/APILoader'
import MapContainer from './components/MapContainer'
import ZoomControl from './components/ZoomControl'
import SearchControl from './components/SearchControl'
import CenterMarker from './components/CenterMarker'
import Markers from './components/Markers'
import Circles from './components/Circles'
import LocationControl from './components/LocationControl'
import NearbyControl from './components/NearbyControl'
// Pages
import MapChoose from './pages/MapChoose'
import MapMarkers from './pages/MapMarkers'

const Map = {
  // utils
  coordsToWgs84,
  wgs84ToCoords,
  getAddress,
  getLocation,
  queryNearby,
  // components
  APILoader,
  MapContainer,
  ZoomControl,
  SearchControl,
  CenterMarker,
  Markers,
  Circles,
  LocationControl,
  NearbyControl,
  // Pages
  MapChoose,
  MapMarkers
}

export default Map
