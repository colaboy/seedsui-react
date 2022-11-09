// 平铺菜单
var MenuTiled = function (container, params) {
  /* ------------------
  Model
  ------------------ */
  var defaults = {
    // DATA
    data: null,
    slotClass: 'menutiled-slot',
    slotSubClass: 'menutiled-slot-sub',
    tagClass: 'menutiled-tag',
    iconMoreClass: 'menutiled-icon-more',
    iconCheckedClass: 'menutiled-icon-checked',
    activeClass: 'active',
    expandClass: 'expand',

    selectedId: '' // 默认选中项的id
    /*
    callbacks
    onClick:function(s, item, isActived, isExpand) // 点击项的数据,是否是选中状态,是否是展开状态
    */
  }
  /* 参数data: [{
    id: '',
    name: '',
    active: false,
    children
  }] */
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  // MenuTiled
  var s = this

  // Params
  s.params = params
  // Container
  s.container = typeof container === 'string' ? document.querySelector(container) : container
  if (!s.container) {
    console.log('SeedsUI Error：未找到MenuTiled的DOM对象，请检查传入参数是否正确')
    return
  }
  s.initData = function (list, container) {
    if (!list || !list.length) return
    var hasSlot = container.querySelector('.' + s.params.slotClass)
    var slot = document.createElement('div')
    slot.setAttribute('class', hasSlot ? s.params.slotSubClass : s.params.slotClass)
    var html = ''
    // eslint-disable-next-line
    for (var i = 0, option; (option = list[i++]); ) {
      html +=
        '<div data-index="' +
        i +
        '" data-id="' +
        option.id +
        '" class="' +
        s.params.tagClass +
        (option.id === s.params.selectedId ? ' active' : '') +
        '">' +
        '<p class="menutiled-tag-font">' +
        option.name +
        '</p>' +
        (option.children && option.children.length > 0
          ? '<i class="' + s.params.iconMoreClass + '"></i>'
          : '<i class="' + s.params.iconChecked + '"></i>') +
        '</div>'
    }
    slot.innerHTML = html
    container.appendChild(slot)
  }
  s.container.innerHTML = ''

  /* ------------------
  Method
  ------------------ */
  // 设置选中项
  s.setSelectedId = function (id) {
    s.params.selectedId = id
  }
  // 重新设置数据
  s.setData = function (data) {
    s.params.data = data
    s.container.innerHTML = ''
    if (!data || !data.length) {
      return
    }
    s.initData(s.params.data, s.container)
  }

  /* ------------------
    Events
    ------------------ */
  // 绑定事件
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    // 树结构
    s.container[action]('click', s.onClick, false)
  }
  // attach、dettach事件
  s.attach = function () {
    s.events()
  }
  s.detach = function () {
    s.events(true)
  }
  /* ------------------
  Event Handler
  ------------------ */
  // 点击树
  s.onClick = function (e) {
    var target = e.target
    s.event = e
    s.target = target
    s.targetLine = target
    if (!target.classList.contains(s.params.tagClass)) return
    // isActived
    var isActived = target.classList.contains('active')
    // isExpand
    var isExpand = target.classList.contains(s.params.expandClass)
    // item
    const id = target.getAttribute('data-id')
    let item = s.params.data.getDeepTreeNode(id)
    // 如果已经展开,则收缩
    if (isExpand) {
      // target.classList.remove(s.params.expandClass)
      // 如果没有展开,则展开并选中,有下级则新建下级节点
    } else {
      // 移除下级节点
      var slot = target.parentNode
      var nextSlot = slot.nextElementSibling
      if (nextSlot) slot.parentNode.removeChild(nextSlot)
      // 移除同级所有的选中项与展开项
      var tags = slot.children
      // eslint-disable-next-line
      for (var i = 0, tag; (tag = tags[i++]); ) {
        if (tag) {
          tag.classList.remove(s.params.expandClass)
          tag.classList.remove(s.params.activeClass)
        }
      }
      // 添加当前节点为选中项和展开项
      target.classList.add(s.params.expandClass)
      target.classList.add(s.params.activeClass)
      // 如果有下级则新建下级节点
      if (item && item.children && item.children.length > 0) {
        s.initData(item.children, s.container)
      }
    }

    if (s.params.onClick) s.params.onClick(s, item, isActived, isExpand)
  }
  // 主函数
  s.init = function () {
    if (s.params.data && s.params.data.length) {
      if (s.params.data && s.params.data.length) s.initData(s.params.data, s.container)
    }
    s.attach()
  }
  s.init()
}

export default MenuTiled
