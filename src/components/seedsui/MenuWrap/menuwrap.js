// 左侧菜单
var MenuWrap = function (container, params) {
  /* ------------------
  Model
  ------------------ */
  var defaults = {
    // DATA
    data: null,
    tagClass: 'menuwrap-tag',
    activeClass: 'active',
    extandClass: 'extand',

    defaultActiveId: '', // 默认选中项的id
    parentHasData: true, // 父节点是否有数据,如果有,则选中父节点时,子节点的选中得去掉
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
  // MenuWrap
  var s = this

  // Params
  s.params = params
  // Container
  s.container = typeof container === 'string' ? document.querySelector(container) : container
  if (!s.container) {
    console.log('SeedsUI Error：未找到MenuWrap的DOM对象，请检查传入参数是否正确')
    return
  }
  s.initData = function (list, ulContainer) {
    for (var i = 0, option; option = list[i++];) { // eslint-disable-line
      var li = document.createElement('li')
      var html = '<div data-index="' + i + '" data-item=\'' + JSON.stringify(option) + '\' class="' + s.params.tagClass + (option.id === s.params.defaultActiveId ? ' active' : '') + '" id="ID-Menuwrap' + option.id +'">' +
      '<p class="menuwrap-tag-font">' + option.caption + '</p>' +
      (option.children && option.children.length > 0 ? '<i class="menuwrap-more"></i>' : '') +
      '</div><ul></ul>'
      li.innerHTML = html
      ulContainer.appendChild(li)
      var ul = s.container.querySelector('#ID-Menuwrap' + option.id).nextElementSibling
      if (option.children && option.children.length > 0) {
        s.initData(option.children, ul)
      }
    }
  }
  s.container.innerHTML = ''

  /* ------------------
  Method
  ------------------ */
  s.setDefaultActiveId = function (id) {
    s.params.defaultActiveId = id
  }
  // 重新设置数据
  s.setData = function (data) {
    s.params.data = data
    s.container.innerHTML = ''
    s.initData(data, s.container)
  }
  // 添加数据
  s.addData = function (data, childNode) {
    s.initData(data, childNode)
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
    var isActived = target.classList.contains(s.params.activeClass)
    var isExtand = target.classList.contains(s.params.extandClass)
    // 如果已经展开,则收缩
    if (isExtand) {
      target.classList.remove(s.params.extandClass)
      // 如果父节点有数据,则将子节点的选中效果去掉
      if (s.params.parentHasData) {
        var tags = target.nextElementSibling.querySelectorAll('.' + s.params.tagClass)
        for (var i = 0, subtag; subtag = tags[i++];) { // eslint-disable-line
          subtag.classList.remove(s.params.extandClass)
          subtag.classList.remove(s.params.activeClass)
        }
      }
    } else {
      // 移除同级所有的选中项与展开项
      var lis = target.parentNode.parentNode.children
      for (var i = 0, li; li = lis[i++];) { // eslint-disable-line
        var tag = li.querySelector('.' + s.params.tagClass)
        if (tag) {
          tag.classList.remove(s.params.extandClass)
          tag.classList.remove(s.params.activeClass)
        }
      }
      // 添加当前节点为选中项和展开项
      target.classList.add(s.params.extandClass)
      target.classList.add(s.params.activeClass)
    }
    // 返回item
    var json = target.getAttribute('data-item') ? JSON.parse(target.getAttribute('data-item')) : null
    if (this.params.onClick) this.params.onClick(json, isActived, !isExtand)
  }
  // 主函数
  s.init = function () {
    s.initData(s.params.data, s.container)
    s.attach()
  }
  s.init()
}

;//export default MenuWrap
