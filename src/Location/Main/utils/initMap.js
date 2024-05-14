// 测试使用
// import { locale, Loading } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'
import Loading from './../../../Loading'

// 初始化地图
function initMap(container, opt) {
  const { center } = opt || {}
  return new Promise((resolve) => {
    if (!window.BMap) {
      // 如果有高德地图, 则加上 || !window.AMap
      resolve(locale('地图库加载失败, 请稍后再试', 'SeedsUI_map_js_load_failed'))
      return
    }

    if (!container) {
      resolve(locale('地图容器不存在', 'SeedsUI_no_mapcontainer_error'))
      return
    }

    Loading.show()

    // 显示地图
    let map = new window.BMap.Map(container, {
      // 禁用点击景点弹出详细信息的方法
      enableMapClick: false
    })

    // 定位到中心点
    if (center) {
      map.centerAndZoom(center, 16)
    } else {
      const currentCity = new window.BMap.LocalCity()
      currentCity.get((result) => {
        map.centerAndZoom(result.name || '北京', 16)
      })
    }

    // 加载完成(它会多次触发, 里面不要加入绘制类的api)
    map.addEventListener(
      'tilesloaded',
      (e) => {
        Loading.hide()

        // 清除加载超时
        window.clearTimeout(map.loadTimeout)

        resolve(map)
      },
      false
    )

    // 超时处理
    map.loadTimeout = setTimeout(() => {
      Loading.hide()
      resolve(locale('初始化地图超时, 请检查当前网络是否稳定', 'SeedsUI_mapinit_overtime_error'))
    }, 20000)
  })
}

export default initMap
