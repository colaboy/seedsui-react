// 内库使用-start
import LocaleUtil from './../../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { locale } from 'seedsui-react'
测试使用-end */

const tabs = function getTabs() {
  if (window.google) {
    return [
      {
        name: LocaleUtil.locale('购物', 'SeedsUI_map_nearby_shop'),
        id: 'store'
      },
      {
        name: LocaleUtil.locale('吃喝', 'SeedsUI_map_nearby_restaurant'),
        id: 'restaurant'
      },
      {
        name: LocaleUtil.locale('娱乐', 'SeedsUI_map_nearby_recreation'),
        id: 'amusement_park,aquarium,movie_theater,museum,night_club,park,zoo'
      },
      {
        name: LocaleUtil.locale('景点', 'SeedsUI_map_nearby_scenery'),
        id: 'library,park,rv_park'
      },
      {
        name: LocaleUtil.locale('出行', 'SeedsUI_map_nearby_trip'),
        id: 'airport,bus_station,subway_station,taxi_stand,train_station,transit_station'
      },
      {
        name: LocaleUtil.locale('住宿', 'SeedsUI_map_nearby_lodgings'),
        id: 'hotel,motel,campground,rv_park'
      }
    ]
  }

  if (window.BMap) {
    return [
      {
        name: LocaleUtil.locale('购物', 'SeedsUI_map_nearby_shop')
      },
      {
        name: LocaleUtil.locale('吃喝', 'SeedsUI_map_nearby_restaurant')
      },
      {
        name: LocaleUtil.locale('生活', 'SeedsUI_map_nearby_live')
      },
      {
        name: LocaleUtil.locale('娱乐', 'SeedsUI_map_nearby_recreation')
      },
      {
        name: LocaleUtil.locale('景点', 'SeedsUI_map_nearby_scenery')
      },
      {
        name: LocaleUtil.locale('出行', 'SeedsUI_map_nearby_trip'),
        id: '公交地铁'
      },
      {
        name: LocaleUtil.locale('住宿', 'SeedsUI_map_nearby_lodgings')
      }
    ]
  }

  return [
    {
      name: LocaleUtil.locale('购物', 'SeedsUI_map_nearby_shop'),
      id: 'shop'
    },
    {
      name: LocaleUtil.locale('吃喝', 'SeedsUI_map_nearby_restaurant'),
      id: 'restaurant'
    }
  ]
}
export default tabs
