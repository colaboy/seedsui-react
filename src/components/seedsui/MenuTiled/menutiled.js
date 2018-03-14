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
    moreClass: 'menutiled-more',
    activeClass: 'active',
    extandClass: 'extand',

    activeId: '', // 默认选中项的id
    /*
    callbacks
    onClick:function(item, isActived, isExtand) // 点击项的数据,是否是选中状态,是否是展开状态
    */
  }
  /* 参数data: [{
    id: '',
    caption: '',
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
  s.initData = function (list) {
    var hasSlot = s.container.querySelector('.' + s.params.slotClass)
    var slot = document.createElement('div')
    slot.setAttribute('class', hasSlot ? s.params.slotSubClass : s.params.slotClass)
    var html = ''
    for (var i = 0, option; option = list[i++];) { // eslint-disable-line
      html += '<div data-index="' + i + '" data-item=\'' + JSON.stringify(option) + '\' class="' + s.params.tagClass + (option.id === s.params.activeId ? ' active' : '') + '">' +
      '<p class="menutiled-tag-font">' + option.caption + '</p>' +
      (option.children && option.children.length > 0 ? '<i class="menutiled-more"></i>' : '<i class="menutiled-select"></i>') +
      '</div>'
    }
    slot.innerHTML = html
    s.container.appendChild(slot)
  }
  s.container.innerHTML = ''

  /* ------------------
  Method
  ------------------ */
  // 设置选中项
  s.setActiveId = function (id) {
    s.params.activeId = id
  }
  // 重新设置数据
  s.setData = function (data) {
    s.params.data = data
    s.container.innerHTML = ''
    s.initData(data)
  }

  /* ------------------
    Events
    ------------------ */
  // 绑定事件
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    // 树结构
    s.container[action]('touchstart', s.onTouchStart, false)
    s.container[action]('touchend', s.onTouchEnd, false)
  }
  // attach、dettach事件
  s.attach = function (event) {
    s.events()
  }
  s.detach = function (event) {
    s.events(true)
  }
  /* ------------------
  Event Handler
  ------------------ */
  // Tap
  s.touches = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    diffX: 0,
    diffY: 0,
  }
  s.onTouchStart = function (e) {
    s.touches.startX = e.touches[0].clientX
    s.touches.startY = e.touches[0].clientY
  }
  s.onTouchEnd = function (e) {
    s.touches.endX = e.changedTouches[0].clientX
    s.touches.endY = e.changedTouches[0].clientY
    s.touches.diffX = s.touches.startX - s.touches.endX
    s.touches.diffY = s.touches.startY - s.touches.endY
    // 单击事件
    if (Math.abs(s.touches.diffX) < 6 && Math.abs(s.touches.diffY) < 6) {
      s.onClick(e)
    }
  }
  // 点击树
  s.onClick = function (e) {
    var target = e.target
    if (!target.classList.contains(s.params.tagClass)) return
    var isActived = target.classList.contains(s.params.activeClass)
    var isExtand = target.classList.contains(s.params.extandClass)
    // 点击行的数据
    var item = target.getAttribute('data-item')
    // 移除下级节点
    var slot = target.parentNode
    var nextSlot = slot.nextElementSibling
    if (nextSlot) slot.parentNode.removeChild(nextSlot)
    // 如果已经展开,则收缩
    if (isExtand) {
      target.classList.remove(s.params.extandClass)
    // 如果没有展开,则展开并选中,有下级则新建下级节点
    } else {
      // 移除同级所有的选中项与展开项
      var tags = slot.children
      for (var i = 0, tag; tag = tags[i++];) { // eslint-disable-line
        if (tag) {
          tag.classList.remove(s.params.extandClass)
          tag.classList.remove(s.params.activeClass)
        }
      }
      // 添加当前节点为选中项和展开项
      target.classList.add(s.params.extandClass)
      target.classList.add(s.params.activeClass)
      // 如果有下级则新建下级节点
      var children = item ? JSON.parse(item).children : null
      if (children && children.length > 0) {
        s.initData(children)
      }
    }
    // 返回item
    var json = item ? JSON.parse(item) : null
    if (this.params.onClick) this.params.onClick(json, isActived, !isExtand)
  }
  // 主函数
  s.init = function () {
    s.initData(s.params.data, s.container)
    s.attach()
  }
  s.init()
}

;//export default MenuTiled
