import locale from './../../../../locale'

const tabs = function getTabs() {
  if (window.BMap) {
    return [
      {
        name: locale('购物')
      },
      {
        name: locale('吃喝')
      },
      {
        name: locale('生活')
      },
      {
        name: locale('娱乐')
      },
      {
        name: locale('景点')
      },
      {
        name: locale('出行'),
        id: '公交地铁'
      },
      {
        name: locale('住宿')
      }
    ]
  }
  if (window.google) {
    return [
      {
        name: locale('购物'),
        id: 'shop'
      },
      {
        name: locale('吃喝'),
        id: 'restaurant'
      },
      {
        name: locale('生活'),
        id: 'vegetable'
      },
      {
        name: locale('娱乐'),
        id: 'movie|spa|cafe|bar'
      },
      {
        name: locale('景点'),
        id: 'tourist'
      },
      {
        name: locale('出行'),
        id: 'bus|metro'
      },
      {
        name: locale('住宿'),
        id: 'lodging'
      }
    ]
  }

  return [
    {
      name: locale('购物'),
      id: 'shop'
    },
    {
      name: locale('吃喝'),
      id: 'restaurant'
    }
  ]
}
export default tabs
