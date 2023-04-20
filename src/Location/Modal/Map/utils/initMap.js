import locale from './../../../../locale'
import Loading from './../../../../Loading'
import addZoomControl from './addZoomControl'

// 初始化地图
function initMap(container, opt) {
  const { center } = opt || {}
  return new Promise((resolve) => {
    if (!window.BMap) {
      // 如果有高德地图, 则加上 || !window.AMap
      resolve(locale('地图库加载失败, 请稍后再试', 'hint_map_failed_load'))
      return
    }

    if (!container) {
      resolve(locale('地图容器不存在', 'hint_map_no_container'))
      return
    }

    Loading.show()

    // 显示地图
    let map = new BMap.Map(container, {
      // 禁用点击景点弹出详细信息的方法
      enableMapClick: false
    })
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 12)

    // 缩放控件
    let navigationControl = null

    // 加载完成(它会多次触发, 里面不要加入绘制类的api)
    map.addEventListener(
      'tilesloaded',
      (e) => {
        Loading.hide()

        // 添加缩放控件
        if (!navigationControl) {
          navigationControl = addZoomControl({ map: map })
        }

        // 清除加载超时
        window.clearTimeout(map.loadTimeout)

        // 定位到中心点
        center && map.centerAndZoom(center || '')

        resolve(map)
      },
      false
    )

    // 超时处理
    map.loadTimeout = setTimeout(() => {
      Loading.hide()
      resolve(locale('初始化地图超时, 请检查当前网络是否稳定', 'hint_map_init_timeout'))
    }, 20000)
  })
}

export default initMap
