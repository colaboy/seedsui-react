// Alert 提示框
var Alert = function (params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    overflowContainerActiveClass: 'overflow-hidden',

    maskClass: 'mask alert-mask',
    maskActiveClass: 'active',

    duration: 300,
    animationAttr: 'data-animation',
    animation: 'zoom',
    animationClass: 'popup-animation middle',

    alertClass: 'alert',
    alertActiveClass: 'active',
    bodyClass: 'alert-body',
    captionClass: 'alert-caption',
    contentClass: 'alert-content',
    footerClass: 'alert-footer',
    buttonSubmitClass: 'alert-submit',
    buttonSubmitExtendClass: 'button',
    buttonCancelClass: 'alert-cancel',
    buttonCancelExtendClass: 'button',

    caption: '',
    html: '',
    buttonSubmitHTML: '确定', // 实例化时需要国际化
    buttonCancelHTML: '取消', // 实例化时需要国际化

    isClickMaskHide: false
    /*
    Callbacks:
    onClick:function(Alert)
    onClickSubmit:function(Alert)
    onClickCancel:function(Alert)
    onClickMask:function(Alert)
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
  // Params
  s.params.mask = null
  if (params.mask) {
    s.params.mask = params.mask
  }

  s.params.parent = document.body // 创建于哪个元素下
  if (params.parent) {
    s.params.parent = params.parent
  }

  s.params.overflowContainer = document.body
  if (params.overflowContainer) {
    s.params.overflowContainer = params.overflowContainer
  }

  // Alert | Mask
  s.mask = null
  s.alert = null
  s.content = null
  s.footer = null
  s.buttonSubmit = null
  s.buttonCancel = null

  // 已有DOM则只更新DOM, 如果没有自定义则创建DOM
  if (s.params.mask)
    s.mask =
      typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask

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
    s.mask.setAttribute('class', s.params.maskClass)
    s.mask.style.webkitTransitionDuration = s.params.duration + 'ms'
  }
  // Alert
  s.updateAlert = function () {
    if (!s.mask) {
      s.updateMask()
      console.log('没有mask')
    }
    if (!s.alert) s.alert = s.mask.querySelector('.' + s.params.alertClass)
    if (!s.alert) {
      s.alert = document.createElement('div')
      s.mask.appendChild(s.alert)
    }
    s.alert.setAttribute(
      'class',
      s.params.alertClass + (s.params.animationClass ? ' ' + s.params.animationClass : '')
    )
    s.alert.setAttribute(s.params.animationAttr, s.params.animation)
    s.alert.style.webkitTransitionDuration = s.params.duration + 'ms'
  }
  // Body
  s.updateBody = function () {
    if (!s.body) s.body = s.alert.querySelector('.' + s.params.bodyClass)
    if (!s.body) {
      s.body = document.createElement('div')
      if (s.footer) {
        s.alert.insertBefore(s.body, s.footer)
      } else {
        s.alert.appendChild(s.body)
      }
    }
    s.body.setAttribute('class', s.params.bodyClass)
  }
  // Content
  s.updateContent = function () {
    if (!s.content) s.content = s.body.querySelector('.' + s.params.contentClass)
    if (!s.content) {
      s.content = document.createElement('div')
      s.body.appendChild(s.content)
    }
    s.content.setAttribute('class', s.params.contentClass)
    if (s.params.html) {
      s.content.innerHTML = s.params.html
    } else {
      s.body.removeChild(s.content)
      s.content = null
    }
  }
  // Footer
  s.updateFooter = function () {
    if (!s.alert) {
      console.log('没有alert')
      s.updateAlert()
    }
    if (!s.footer) s.footer = s.alert.querySelector('.' + s.params.footerClass)
    if (!s.footer) {
      s.footer = document.createElement('div')
      s.alert.appendChild(s.footer)
    }
    s.footer.setAttribute('class', s.params.footerClass)
  }
  function createButton(html, className) {
    var button = document.createElement('a')
    button.setAttribute('class', className)
    button.innerHTML = html
    return button
  }
  // ButtonCancel
  s.updateButtonCancel = function () {
    if (!s.footer) {
      console.log('没有footer')
      s.updateFooter()
    }
    if (!s.buttonCancel) s.buttonCancel = s.footer.querySelector('.' + s.params.buttonCancelClass)
    var className = s.params.buttonCancelClass + ' ' + s.params.buttonCancelExtendClass

    // 如果有属性, 却没有取消按钮, 则创建一个
    if (s.params.onClickCancel && !s.buttonCancel) {
      s.buttonCancel = createButton(s.params.buttonCancelHTML, className)
      if (s.buttonSubmit) {
        s.footer.insertBefore(s.buttonCancel, s.buttonSubmit)
      } else {
        s.footer.appendChild(s.buttonCancel)
      }
    }
    // 取消按钮
    if (s.buttonCancel) {
      s.buttonCancel.innerHTML = s.params.buttonCancelHTML
      s.buttonCancel.setAttribute('class', className)
    }
  }
  // ButtonSubmit
  s.updateButtonSubmit = function () {
    if (!s.footer) {
      console.log('没有footer')
      s.updateFooter()
    }
    if (!s.buttonSubmit) s.buttonSubmit = s.footer.querySelector('.' + s.params.buttonSubmitClass)
    var className = s.params.buttonSubmitClass + ' ' + s.params.buttonSubmitExtendClass
    // 如果有属性, 却没有确定按钮, 则创建一个
    if (s.params.onClickSubmit && !s.buttonSubmit) {
      s.buttonSubmit = createButton(s.params.buttonSubmitHTML, className)
      s.footer.appendChild(s.buttonSubmit)
    }
    // 确定按钮
    if (s.buttonSubmit) {
      s.buttonSubmit.innerHTML = s.params.buttonSubmitHTML
      s.buttonSubmit.setAttribute('class', className)
    }
  }
  // Caption
  s.updateCaption = function () {
    s.caption = s.body.querySelector('.' + s.params.captionClass)
    if (!s.caption) {
      s.caption = document.createElement('div')
      s.caption.setAttribute('class', s.params.captionClass)
      if (s.content) {
        s.body.insertBefore(s.caption, s.content)
      } else {
        s.body.appendChild(s.caption)
      }
    }
    if (s.params.caption && s.params.caption !== '') {
      s.caption.innerHTML = s.params.caption
    } else {
      s.body.removeChild(s.caption)
      s.caption = null
    }
  }

  // 更新DOM
  s.update = function () {
    // Parent | OverflowContainer
    s.parent =
      typeof s.params.parent === 'string'
        ? document.querySelector(s.params.parent)
        : s.params.parent
    s.overflowContainer =
      typeof s.params.overflowContainer === 'string'
        ? document.querySelector(s.params.overflowContainer)
        : s.params.overflowContainer
    if (!s.parent) {
      console.log('没有parent')
      return
    }
    if (!s.overflowContainer) {
      console.log('没有parent')
      return
    }
    s.updateMask()
    s.updateAlert()
    s.updateBody()
    s.updateFooter()
    s.updateCaption()
    s.updateContent()
    s.updateButtonCancel()
    s.updateButtonSubmit()
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
  /* --------------------
  Method
  -------------------- */
  s.showMask = function () {
    s.mask.classList.add(s.params.maskActiveClass)
  }
  s.hideMask = function () {
    s.mask.classList.remove(s.params.maskActiveClass)
  }
  s.destroyMask = function () {
    s.mask.parentNode.removeChild(s.mask)
  }
  s.showAlert = function () {
    s.alert.classList.add(s.params.alertActiveClass)
  }
  s.hideAlert = function () {
    s.alert.classList.remove(s.params.alertActiveClass)
  }
  s.isHid = true
  s.hide = function () {
    s.isHid = true
    // 隐藏遮罩
    s.hideMask()
    // 隐藏弹出框
    s.hideAlert()
    // 显示滚动条
    if (s.overflowContainer)
      s.overflowContainer.classList.remove(s.params.overflowContainerActiveClass)
    // 执行回调
    if (s.params.duration === 0) s.onTransitionEnd()
  }
  s.show = function () {
    s.isHid = false
    // 显示遮罩
    s.showMask()
    // 显示弹出框
    s.showAlert()
    // 禁用滚动条
    if (s.overflowContainer)
      s.overflowContainer.classList.add(s.params.overflowContainerActiveClass)
    // 执行回调
    if (s.params.duration === 0) s.onTransitionEnd()
  }
  s.destroy = function () {
    s.destroyMask()
  }
  /* --------------------
  Control
  -------------------- */
  s.events = function (detach) {
    var touchTarget = s.alert
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
    s.event = e

    if (s.params.onClick) s.params.onClick(s)
    if (e.target.className.indexOf(s.params.buttonSubmitClass) !== -1) {
      if (s.params.onClickSubmit) s.params.onClickSubmit(s)
      else s.hide()
    } else if (e.target.className.indexOf(s.params.buttonCancelClass) !== -1) {
      if (s.params.onClickCancel) s.params.onClickCancel(s)
      else s.hide()
    }
  }
  s.onClickMask = function (e) {
    if (e.target === s.mask) {
      s.event = e
      if (s.params.onClickMask) s.params.onClickMask(s)
      if (s.params.isClickMaskHide) s.hide()
    }
  }
  s.onTransitionEnd = function (e) {
    if (e && e.propertyName === 'visibility') return
    if (s.isHid) {
      // Callback onHid
      if (s.params.onHid) s.params.onHid(s)
    } else {
      // Callback onShowed
      if (s.params.onShowed) s.params.onShowed(s)
    }
  }
  /* --------------------
  Init
  -------------------- */
  s.init = function () {
    s.attach()
  }
  s.init()
}

export default Alert
