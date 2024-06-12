// 百度地图瓦片图层插件
function loadBMapLayer() {
  // 百度地图瓦片图层
  window.L.TileLayer.BMapLayer = window.L.TileLayer.extend({
    getTileUrl: function (coords) {
      var z = coords.z
      var x = coords.x
      var y = coords.y

      var offsetX = Math.pow(2, z - 1)
      var offsetY = offsetX - 1
      var numX = x - offsetX
      var numY = -y + offsetY

      var num = ((x + y) % 8) + 1

      var url = `https://online${num}.map.bdimg.com/tile/?qt=tile&x=${numX}&y=${numY}&z=${z}&styles=pl&scaler=1&p=1`
      return url
    }
  })

  // 创建百度地图瓦片图层
  window.L.tileLayer.BMapLayer = function () {
    return new L.TileLayer.BMapLayer()
  }
}

export default loadBMapLayer
