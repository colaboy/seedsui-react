// Actionsheet
var Actionsheet = function (params) {
  /* ------------------
  Model
  ------------------ */
  var defaults = {
    overflowContainer: document.body,
    overflowContainerActiveClass: 'overflow-hidden',
    parent: document.body,

    mask: null,
    maskClass: 'mask',
    maskActiveClass: 'active',
    maskFeatureClass: 'actionsheet-mask',

    actionsheetClass: 'actionsheet',
    groupClass: 'actionsheet-group',
    optionClass: 'actionsheet-option',
    buttonCancelClass: 'actionsheet-cancel',
    buttonCancelHTML: '取消',
    isClickMaskHide: true,
    data: []
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
  s.parent = typeof s.params.parent === 'string' ? document.querySelector(s.params.parent) : s.params.parent
  s.overflowContainer = typeof s.params.overflowContainer === 'string' ? document.querySelector(s.params.overflowContainer) : s.params.overflowContainer
  // Actionsheet | Mask
  s.actionsheet
  s.mask
  s.group
  s.options = []
  // Mask
  s.createMask = function () {
    var mask = document.createElement('div')
    mask.setAttribute('class', s.params.maskClass + ' ' + s.params.maskFeatureClass)
    return mask
  }
  // Actionsheet
  s.createActionsheet = function () {
    var actionsheet = document.createElement('div')
    actionsheet.setAttribute('class', s.params.actionsheetClass)
    return actionsheet
  }
  // Group
  s.createGroup = function () {
    var group = document.createElement('div')
    group.setAttribute('class', s.params.groupClass)
    return group
  }
  // Options
  s.createOptions = function (appendToEl) {
    var options = []
    /* eslint-disable */
    for (var i = 0, opt; opt = s.params.data[i++];) {
      var option = document.createElement('a')
      option.setAttribute('class', s.params.optionClass)
      option.innerHTML = opt.text
      option.handler = opt.handler
      options.push(option)
      appendToEl.appendChild(option)
    }
    /* eslint-enable */
    return options
  }
  // buttonCancel
  s.createButtonCancel = function () {
    // 创建取消按钮
    if (!s.params.buttonCancelHTML) {
      return 0
    }
    var buttonCancel = document.createElement('a')
    buttonCancel.setAttribute('class', s.params.buttonCancelClass)
    buttonCancel.innerHTML = s.params.buttonCancelHTML
    return buttonCancel
  }

  s.create = function () {
    if (s.params.mask) s.mask = typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask
    if (s.mask) {
      s.actionsheet = s.mask.querySelector('.' + s.params.actionsheetClass)
      s.group = s.mask.querySelector('.' + s.params.groupClass)
      s.options = [].slice.call(s.mask.querySelectorAll('.' + s.params.optionClass))
      /* eslint-disable */
      // for (var i = 0, option; option = s.options[i++];) {
      //   option.handler = option.getAttribute('handler')
      // }
      /* eslint-enable */
      s.buttonCancel = s.mask.querySelector('.' + s.params.buttonCancelClass)
      return
    }
    s.mask = s.createMask()
    s.actionsheet = s.createActionsheet()
    s.group = s.createGroup()
    s.options = s.createOptions(s.group) // 创建项，并append到group里
    s.buttonCancel = s.createButtonCancel()
    s.actionsheet.appendChild(s.group)
    s.actionsheet.appendChild(s.buttonCancel)
    s.mask.appendChild(s.actionsheet)
    s.parent.appendChild(s.mask)
  }
  s.create()
  // 设置数据
  s.setData = function (data) {
    s.params.data = data
    if (s.actionsheet) s.updateData(s.actionsheet)
    else s.createActionsheet()
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
    if (s.overflowContainer) s.overflowContainer.classList.remove(s.params.overflowContainerActiveClass)
  }
  s.show = function () {
    s.isHid = false
    // 显示遮罩
    s.showMask()
    // 显示弹出框
    s.showActionsheet()
    // 禁用滚动条
    if (s.overflowContainer) s.overflowContainer.classList.add(s.params.overflowContainerActiveClass)
  }
  s.destroy = function () {
    // 移动事件监听
    s.detach()
    // 移除遮罩
    s.destroyMask()
    // 移除弹出框
    s.destroyActionsheet()
  }
  // 设置
  s.setOnClick = function (fn) {
    s.params.onClick = fn
  }
  s.setOnClickMask = function (fn) {
    s.params.onClickMask = fn
  }
  /* ------------------
  Control
  ------------------ */
  s.events = function (detach) {
    var touchTarget = s.actionsheet
    var action = detach ? 'removeEventListener' : 'addEventListener'
    touchTarget[action]('click', s.onClick, false)
    touchTarget[action]('webkitTransitionEnd', s.onTransitionEnd, false)
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
    s.target = e.target
    // 点击容器
    if (s.params.onClick) s.params.onClick(s)
    // 点击项
    var options = s.options
    /* eslint-disable */
    for (var i = 0, option; option = options[i++];) {
      if (option === s.target) {
        // Callback
        if(option.handler instanceof Function) option.handler(s)
        return
      }
    }
    /* eslint-enable */
    // 点击取消按钮
    if (s.params.onClickCancel && s.buttonCancel === s.target) {
      s.params.onClickCancel(s)
      return
    }
    s.hide()
  }

  s.onClickMask = function (e) {
    if (e.target === s.mask) {
      s.target = e.target
      if (s.params.onClickMask) s.params.onClickMask(s)
      if (s.params.isClickMaskHide) s.hide()
    }
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

;//export default Actionsheet
