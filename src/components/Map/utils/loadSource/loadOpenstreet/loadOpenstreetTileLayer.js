function loadOpenstreetTileLayer() {
  window.L.tileLayer.currentTileLayer = function () {
    return window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
  }

  return true
}

export default loadOpenstreetTileLayer
