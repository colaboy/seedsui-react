const tabs = function getTabs() {
  if (window.BMap) {
    return [
      {
        name: '购物'
      },
      {
        name: '吃喝'
      },
      {
        name: '生活'
      },
      {
        name: '娱乐'
      },
      {
        name: '景点'
      },
      {
        name: '出行',
        id: '公交地铁'
      },
      {
        name: '住宿'
      }
    ]
  }
  return [
    {
      name: '购物',
      id: 'shop'
    },
    {
      name: '吃喝',
      id: 'restaurant'
    },
    {
      name: '生活',
      id: 'vegetable'
    },
    {
      name: '娱乐',
      id: 'movie|spa|cafe|bar'
    },
    {
      name: '景点',
      id: 'tourist'
    },
    {
      name: '出行',
      id: 'bus|metro'
    },
    {
      name: '住宿',
      id: 'lodging'
    }
  ]
}
export default tabs
