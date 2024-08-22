// Utils
import coordsToWgs84 from './utils/coordsToWgs84'
import getAddress from './utils/getAddress'
import getLocation from './utils/getLocation'
import queryNearby from './utils/queryNearby'
import IconUtil from './utils/IconUtil'
// Components
import APILoader from './components/APILoader'
import MapContainer from './components/MapContainer'
import ZoomControl from './components/ZoomControl'
import SearchControl from './components/SearchControl'
import CenterMarker from './components/CenterMarker'
import Markers from './components/Markers'
import LocationControl from './components/LocationControl'
import NearbyControl from './components/NearbyControl'
// Pages
import MapChoose from './pages/MapChoose'
import MapMarkers from './pages/MapMarkers'

const Map = {
  // utils
  coordsToWgs84,
  getAddress,
  getLocation,
  queryNearby,
  IconUtil,
  // components
  APILoader,
  MapContainer,
  ZoomControl,
  SearchControl,
  CenterMarker,
  Markers,
  LocationControl,
  NearbyControl,
  // Pages
  MapChoose,
  MapMarkers
}

export default Map
