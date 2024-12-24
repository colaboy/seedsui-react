// 内库使用-start
// import locale from './../../../../locale'
// 内库使用-end

// 测试使用-start
import { locale } from 'seedsui-react'
// 测试使用-end

const tabs = function getTabs() {
  if (window.google) {
    return [
      {
        name: locale('购物', 'SeedsUI_map_nearby_shop'),
        id: 'store'
      },
      {
        name: locale('吃喝', 'SeedsUI_map_nearby_restaurant'),
        id: 'restaurant'
      },
      {
        name: locale('娱乐', 'SeedsUI_map_nearby_recreation'),
        id: 'amusement_park,aquarium,movie_theater,museum,night_club,park,zoo'
      },
      {
        name: locale('景点', 'SeedsUI_map_nearby_scenery'),
        id: 'library,park,rv_park'
      },
      {
        name: locale('出行', 'SeedsUI_map_nearby_trip'),
        id: 'airport,bus_station,subway_station,taxi_stand,train_station,transit_station'
      },
      {
        name: locale('住宿', 'SeedsUI_map_nearby_lodgings'),
        id: 'hotel,motel,campground,rv_park'
      }
    ]
  }

  if (window.BMap) {
    return [
      {
        name: locale('购物', 'SeedsUI_map_nearby_shop')
      },
      {
        name: locale('吃喝', 'SeedsUI_map_nearby_restaurant')
      },
      {
        name: locale('生活', 'SeedsUI_map_nearby_live')
      },
      {
        name: locale('娱乐', 'SeedsUI_map_nearby_recreation')
      },
      {
        name: locale('景点', 'SeedsUI_map_nearby_scenery')
      },
      {
        name: locale('出行', 'SeedsUI_map_nearby_trip'),
        id: '公交地铁'
      },
      {
        name: locale('住宿', 'SeedsUI_map_nearby_lodgings')
      }
    ]
  }

  return [
    {
      name: locale('购物', 'SeedsUI_map_nearby_shop'),
      id: 'shop'
    },
    {
      name: locale('吃喝', 'SeedsUI_map_nearby_restaurant'),
      id: 'restaurant'
    }
  ]
}
export default tabs
