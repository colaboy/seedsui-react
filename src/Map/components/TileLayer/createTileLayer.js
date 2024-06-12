// Create leaflet tile layer
async function createTileLayer(map) {
  let tileLayer = null
  // Use google tileLayer
  if (window.L.gridLayer.googleMutant) {
    tileLayer = window.L.gridLayer.googleMutant({ type: 'roadmap' }).addTo(map)
  }
  // Use bmap tileLayer
  if (window.L.tileLayer.baiDuTileLayer) {
    tileLayer = window.L.tileLayer
      .baiDuTileLayer('qt=vtile&styles=pl&showtext=1&scaler=2&v=083')
      .addTo(map)
    // tileLayer = L.control
    //   .layers(
    //     {
    // 百度地图: window.L.tileLayer.BMapLayer({ layer: 'vec' }).addTo(map),
    // 百度卫星: window.L.tileLayer.BMapLayer({ layer: 'img' }),
    // '百度地图-大字体': window.L.tileLayer.BMapLayer({
    //   layer: 'vec',
    //   bigfont: true
    // }),
    // '百度卫星-大字体': window.L.tileLayer.BMapLayer({
    //   layer: 'img',
    //   bigfont: true
    // }),
    // '自定义样式-黑色地图': window.L.tileLayer.BMapLayer({
    //   layer: 'custom',
    //   customid: 'dark'
    // }),
    // '自定义样式-蓝色地图': window.L.tileLayer.BMapLayer({
    //   layer: 'custom',
    //   customid: 'midnight'
    // }) //自定义样式地图，customid可选值：dark,midnight,grayscale,hardedge,light,redalert,googlelite,grassgreen,pink,darkgreen,bluish
    // },
    // {
    // 实时交通信息: window.L.tileLayer.BMapLayer({ layer: 'time' })
    //   },
    //   { position: 'topright' }
    // )
    // .addTo(map)
  }
  // Use openStreetMap tileLayer
  else {
    tileLayer = window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
  }

  return tileLayer
}

export default createTileLayer
