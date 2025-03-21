window.seedsConfig = {
  // Map
  map: {
    defaultCenterMarkerIconOptions: {
      iconUrl: `https://colaboy.github.io/seedsui-react/assets//plugin/leaflet/images/marker-custom-shop.png`,
      iconRetinaUrl: `https://colaboy.github.io/seedsui-react/assets//plugin/leaflet/images/marker-custom-shop.png`,
      shadowUrl: `https://colaboy.github.io/seedsui-react/assets//plugin/leaflet/images/marker-shadow.png`,
      shadowRetinaUrl: `https://colaboy.github.io/seedsui-react/assets//plugin/leaflet/images/marker-shadow.png`
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
  }
  // List
}

export default function config(config) {
  window.seedsConfig = {
    ...window.seedsConfig,
    ...config
  }
}
