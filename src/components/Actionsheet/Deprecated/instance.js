// Actionsheet
var Actionsheet = function (params) {
  /* ------------------
  Model
  ------------------ */
  var defaults = {
    overflowContainer: document.body,
    overflowContainerActiveClass: 'overflow-hidden',
    parent: document.body,

    animationAttr: 'data-animation',
    animation: 'slideUp',
    animationClass: 'popup-animation bottom-center',

    mask: null,
    maskClass: 'mask',
    maskActiveClass: 'active',
    maskFeatureClass: 'actionsheet-mask',

    actionsheetClass: 'actionsheet',
    groupClass: 'actionsheet-group',
    optionClass: 'actionsheet-option',
    buttonCancelClass: 'actionsheet-cancel',
    buttonCancelHTML: '取消', // 实例化时需要国际化
    data: [], // [{text: '', handler: func()}]
    /*
    Callbacks:
    option.handler:function(Actionsheet)
    onClickCancel:function(Actionsheet)
    onClickMask:function(Actionsheet)
    */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  var s = this
  s.params = params
  // Parent | OverflowContainer
  s.parent =
    typeof s.params.parent === 'string' ? document.querySelector(s.params.parent) : s.params.parent
  s.overflowContainer =
    typeof s.params.overflowContainer === 'string'
      ? document.querySelector(s.params.overflowContainer)
      : s.params.overflowContainer
  if (!s.parent) {
    console.warn('SeedsUI Error: IndexBar控件缺少parent')
    return
  }
  if (!s.overflowContainer) s.overflowContainer = s.parent
  // Actionsheet | Mask
  s.actionsheet
  s.mask
  s.group
  s.options = []
  // Mask
  s.updateMask = function () {
    if (!s.parent) {
      console.log('没有parent')
      return
    }
    if (!s.mask)
      s.mask =
        typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask
    if (!s.mask || !s.mask.tagName) {
      s.mask = document.createElement('div')
      s.parent.appendChild(s.mask)
    }
    s.mask.setAttribute('class', s.params.maskClass + ' ' + s.params.maskFeatureClass)
  }
  // Actionsheet
  s.updateActionsheet = function () {
    if (!s.mask) {
      s.updateMask()
      console.log('没有mask')
    }
    if (!s.actionsheet) s.actionsheet = s.mask.querySelector('.' + s.params.actionsheetClass)
    if (!s.actionsheet || !s.actionsheet.tagName) {
      s.actionsheet = document.createElement('div')
      s.mask.appendChild(s.actionsheet)
    }
    s.actionsheet.setAttribute(
      'class',
      s.params.actionsheetClass + (s.params.animationClass ? ' ' + s.params.animationClass : '')
    )
    s.actionsheet.setAttribute(s.params.animationAttr, s.params.animation)
  }
  // Group
  s.updateGroup = function () {
    if (!s.actionsheet) {
      s.updateActionsheet()
      console.log('没有actionsheet')
    }
    if (!s.group) s.group = s.mask.querySelector('.' + s.params.groupClass)
    if (!s.group || !s.group.tagName) {
      s.group = document.createElement('div')
      s.actionsheet.appendChild(s.group)
    }
    s.group.setAttribute('class', s.params.groupClass)
    // Options
    s.group.innerHTML = ''
    s.options = []
    // eslint-disable-next-line
    for (var [i, opt] of s.params.data.entries()) {
      var option = document.createElement('a')
      option.setAttribute('class', s.params.optionClass)
      option.setAttribute('data-index', i)
      option.innerHTML = opt.text
      s.options.push(option)
      s.group.appendChild(option)
    }
  }
  // ButtonCancel
  s.updateButtonCancel = function () {
    if (!s.actionsheet) {
      s.updateActionsheet()
      console.log('没有actionsheet')
    }
    if (!s.buttonCancel) s.buttonCancel = s.mask.querySelector('.' + s.params.buttonCancelClass)
    if (!s.buttonCancel || !s.buttonCancel.tagName) {
      s.buttonCancel = document.createElement('a')
      s.actionsheet.appendChild(s.buttonCancel)
    }
    s.buttonCancel.setAttribute('class', s.params.buttonCancelClass)
    s.buttonCancel.innerHTML = s.params.buttonCancelHTML
  }

  s.update = function () {
    s.updateMask()
    s.updateActionsheet()
    s.updateGroup()
    s.updateButtonCancel()
  }
  s.update()

  // 更新params
  s.updateParams = function (params = {}) {
    for (var param in params) {
      s.params[param] = params[param]
    }
    // 更新DOM
    s.update()
  }
  /* ------------------
  Method
  ------------------ */
  s.showMask = function () {
    s.mask.classList.add(s.params.maskActiveClass)
  }
  s.hideMask = function () {
    s.mask.classList.remove(s.params.maskActiveClass)
  }
  s.destroyMask = function () {
    s.parent.removeChild(s.mask)
  }
  s.showActionsheet = function () {
    s.actionsheet.classList.add(s.params.maskActiveClass)
  }
  s.hideActionsheet = function () {
    s.actionsheet.classList.remove(s.params.maskActiveClass)
  }
  s.destroyActionsheet = function () {
    s.parent.removeChild(s.actionsheet)
  }

  s.isHid = true
  s.hide = function () {
    s.isHid = true
    // 显示遮罩
    s.hideMask()
    // 显示弹出框
    s.hideActionsheet()
    // 显示滚动条
    if (s.overflowContainer)
      s.overflowContainer.classList.remove(s.params.overflowContainerActiveClass)
  }
  s.show = function () {
    s.isHid = false
    // 显示遮罩
    s.showMask()
    // 显示弹出框
    s.showActionsheet()
    // 禁用滚动条
    if (s.overflowContainer)
      s.overflowContainer.classList.add(s.params.overflowContainerActiveClass)
  }
  s.destroy = function () {
    // 销毁
    s.destroyMask()
  }
  /* ------------------
  Control
  ------------------ */
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    s.mask[action]('click', s.onClick, false)
    s.actionsheet[action]('webkitTransitionEnd', s.onTransitionEnd, false)
    // 遮罩
    s.mask[action]('click', s.onClickMask, false)
  }
  // attach、dettach事件
  s.attach = function (event) {
    s.events()
  }
  s.detach = function (event) {
    s.events(true)
  }
  s.onClick = function (e) {
    s.event = e
    // 点击容器
    if (s.params.onClick) s.params.onClick(s)
    if (e.target.classList.contains(s.params.maskClass)) {
      // 点击遮罩
      s.onClickMask(s)
    } else if (e.target.classList.contains(s.params.headerCancelClass)) {
      // 点击确定按钮
      s.onClickCancel(s)
    } else if (e.target.classList.contains(s.params.optionClass)) {
      // 点击项
      s.onClickOption(s)
    }

    s.hide()
  }
  // 点击遮罩
  s.onClickMask = function (s) {
    if (s.params.onClickMask) s.params.onClickMask(s)
    else s.hide()
  }
  // 点击项
  s.onClickOption = function (s) {
    var e = s.event
    var index = e.target.getAttribute('data-index')
    if (!isNaN(index)) {
      if (s.params.data[index].handler instanceof Function) option.handler(s)
    }
  }
  // Cancel
  s.onClickCancel = function (s) {
    if (s.params.onClickCancel) s.params.onClickCancel(s)
    else s.hide()
  }

  s.onTransitionEnd = function (e) {
    if (e.propertyName === 'visibility') return
  }
  /* ------------------
  Init
  ------------------ */
  s.init = function () {
    s.attach()
  }
  s.init()
}

export default Actionsheet
