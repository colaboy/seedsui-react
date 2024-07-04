import locale from './../../../../locale'

const tabs = function getTabs() {
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
  if (window.google) {
    return [
      {
        name: locale('购物', 'SeedsUI_map_nearby_shop'),
        id: 'shop'
      },
      {
        name: locale('吃喝', 'SeedsUI_map_nearby_restaurant'),
        id: 'restaurant'
      },
      {
        name: locale('生活', 'SeedsUI_map_nearby_live'),
        id: 'vegetable'
      },
      {
        name: locale('娱乐', 'SeedsUI_map_nearby_recreation'),
        id: 'movie|spa|cafe|bar'
      },
      {
        name: locale('景点', 'SeedsUI_map_nearby_scenery'),
        id: 'tourist'
      },
      {
        name: locale('出行', 'SeedsUI_map_nearby_trip'),
        id: 'bus|metro'
      },
      {
        name: locale('住宿', 'SeedsUI_map_nearby_lodgings'),
        id: 'lodging'
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
