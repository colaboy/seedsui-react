import getAddress from './utils/getAddress'
import queryNearby from './utils/queryNearby'
import APILoader from './components/APILoader'
import MapContainer from './components/MapContainer'
import ZoomControl from './components/ZoomControl'
import SearchControl from './components/SearchControl'
import CenterMarker from './components/CenterMarker'
import Markers from './components/Markers'
import LocationControl from './components/LocationControl'
import NearbyControl from './components/NearbyControl'

const Map = {
  // utils
  getAddress,
  queryNearby,
  // components
  APILoader,
  MapContainer,
  ZoomControl,
  SearchControl,
  CenterMarker,
  Markers,
  LocationControl,
  NearbyControl
}

export default Map
