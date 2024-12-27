// PickerSelect 滚动选择器
var PickerSelect = function (params) {
  /* ------------------------
  Model
  ------------------------ */
  var defaults = {
    multiple: true, // 是否允许多选
    overflowContainer: document.body,
    overflowContainerActiveClass: 'overflow-hidden',

    mask: null,

    maskClass: 'mask',
    maskActiveClass: 'active',
    maskFeatureClass: 'picker-mask',

    pickerClass: 'pickerselect',
    pickerActiveClass: 'active',

    headerClass: 'picker-header',
    headerTitleClass: 'picker-header-title',
    headerSubmitClass: 'picker-submit',
    headerSubmitText: '完成', // 实例化时需要国际化
    headerCancelClass: 'picker-cancel',
    headerCancelText: '取消', // 实例化时需要国际化

    wrapperClass: 'pickerselect-wrapper',
    optionClass: 'pickerselect-option',
    optionActiveClass: 'active'
    /* callbacks
    onInit:function (Picker)
    onClickCancel:function (Picker)
    onClickSubmit:function (Picker)
    onClickMask:functioin (Picker)
    onTransitionEnd:function (Picker)// 动画结束后回调
    onShowed(Picker)// 显示动画结束后回调
    onHid(Picker)// 隐藏动画结束后回调
      */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  // Picker
  var s = this

  // Params
  s.params = params
  // Dom元素
  s.overflowContainer =
    typeof s.params.overflowContainer === 'string'
      ? document.querySelector(s.params.overflowContainer)
      : s.params.overflowContainer
  if (!s.overflowContainer) {
    console.log('SeedsUI Error：未找到PickerSelect的overflowContainer元素，请检查传入参数是否正确')
    return
  }
  s.picker = null
  s.mask = null
  s.header = null
  s.wrapper = null
  s.headerSubmit = null
  s.headerCancel = null

  // 新建Picker
  s.createPicker = function () {
    var picker = document.createElement('div')
    picker.setAttribute('class', s.params.pickerClass)
    return picker
  }

  // 新建Header
  s.createHeader = function () {
    var header = document.createElement('div')
    header.setAttribute('class', s.params.headerClass)
    return header
  }

  // 新建标题
  s.createHeaderTitle = function () {
    var headerTitle = document.createElement('div')
    headerTitle.setAttribute('class', s.params.headerTitleClass)
    return headerTitle
  }

  // 新建Header按钮
  s.createHeaderSubmit = function () {
    var headerSubmit = document.createElement('a')
    headerSubmit.setAttribute('class', s.params.headerSubmitClass)
    headerSubmit.innerHTML = s.params.headerSubmitText
    return headerSubmit
  }
  s.createHeaderCancel = function () {
    var headerCancel = document.createElement('a')
    headerCancel.setAttribute('class', s.params.headerCancelClass)
    headerCancel.innerHTML = s.params.headerCancelText
    return headerCancel
  }

  // 新建Wrapper
  s.createWrapper = function () {
    var wrapper = document.createElement('div')
    wrapper.setAttribute('class', s.params.wrapperClass)
    return wrapper
  }

  // 新建Mask
  s.createMask = function () {
    var mask = document.createElement('div')
    mask.setAttribute('class', s.params.maskClass + ' ' + s.params.maskFeatureClass)
    return mask
  }

  // 创建DOM
  s.create = function () {
    if (s.params.mask)
      s.mask =
        typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask

    if (s.mask && s.mask.tagName) {
      s.picker = s.mask.querySelector('.' + s.params.pickerClass)
      s.header = s.mask.querySelector('.' + s.params.headerClass)
      s.headerSubmit = s.mask.querySelector('.' + s.params.headerSubmitClass)
      s.headerCancel = s.mask.querySelector('.' + s.params.headerCancelClass)
      s.headerTitle = s.mask.querySelector('.' + s.params.headerTitleClass)
      s.wrapper = s.mask.querySelector('.' + s.params.wrapperClass)
      return
    }
    s.mask = s.createMask()
    s.picker = s.createPicker()
    s.header = s.createHeader()
    s.headerSubmit = s.createHeaderSubmit()
    s.headerCancel = s.createHeaderCancel()
    s.headerTitle = s.createHeaderTitle()
    s.wrapper = s.createWrapper()

    s.header.appendChild(s.headerCancel)
    s.header.appendChild(s.headerTitle)
    s.header.appendChild(s.headerSubmit)

    s.picker.appendChild(s.header)
    s.picker.appendChild(s.wrapper)

    s.mask.appendChild(s.picker)
    s.overflowContainer.appendChild(s.mask)
  }
  s.create()
  /* ------------------------
  Method
  ------------------------ */
  // 选中项
  s.activeOptions = []
  s.setActiveOptions = function (options) {
    s.activeOptions = options
    s.updateActive()
  }
  s.updateActive = function () {
    var options = [].slice.call(s.picker.querySelectorAll('.' + s.params.optionClass))
    var activeIds = s.activeOptions.map(function (item) {
      return item.id
    })
    options.forEach(function (n, i) {
      var id = n.getAttribute('data-id')
      if (activeIds.indexOf(id) >= 0) {
        n.classList.add(s.params.optionActiveClass)
      } else {
        n.classList.remove(s.params.optionActiveClass)
      }
    })
  }
  s.isHid = true
  // 隐藏
  s.hide = function () {
    s.isHid = true
    s.mask.classList.remove(s.params.maskActiveClass)
    s.picker.classList.remove(s.params.pickerActiveClass)
    // 显示滚动条
    if (s.overflowContainer)
      s.overflowContainer.classList.remove(s.params.overflowContainerActiveClass)
  }
  s.show = function () {
    // 显示
    s.isHid = false
    s.mask.classList.add(s.params.maskActiveClass)
    s.picker.classList.add(s.params.pickerActiveClass)
    // 禁用滚动条
    if (s.overflowContainer)
      s.overflowContainer.classList.add(s.params.overflowContainerActiveClass)
  }
  s.destroy = function () {
    // 销毁
    s.overflowContainer.removeChild(s.mask)
  }
  /* ------------------------
  Control
  ------------------------ */
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    // 选择器事件
    s.picker[action]('webkitTransitionEnd', s.onTransitionEnd, false)
    // 点击
    s.mask[action]('click', s.onClick, false)
  }
  s.detach = function (event) {
    s.events(true)
  }
  s.attach = function (event) {
    s.events()
  }

  s.onClick = function (e) {
    s.event = e
    // 点击容器
    if (s.params.onClick) {
      s.params.onClick(s)
    }
    if (e.target.classList.contains(s.params.maskClass)) {
      // 点击遮罩
      s.onClickMask(s)
    } else if (e.target.classList.contains(s.params.optionClass)) {
      // 点击项
      s.onClickOption(s)
    } else if (e.target.classList.contains(s.params.headerSubmitClass)) {
      // 点击确定按钮
      s.onClickSubmit(s)
    } else if (e.target.classList.contains(s.params.headerCancelClass)) {
      // 点击确定按钮
      s.onClickCancel(s)
    }
  }

  // Mask
  s.onClickMask = function (s) {
    if (s.params.onClickMask) s.params.onClickMask(s)
    else s.hide()
  }
  // Wrapper
  s.onClickOption = function (s) {
    var e = s.event
    var options = [].slice.call(s.picker.querySelectorAll('.' + s.params.optionClass))
    s.activeOptions = []
    // 多选
    if (s.params.multiple) {
      if (e.target.classList.contains(s.params.optionActiveClass)) {
        e.target.classList.remove(s.params.optionActiveClass)
      } else {
        e.target.classList.add(s.params.optionActiveClass)
      }
      // 获得选中项
      options.forEach(function (n, i) {
        if (n.classList.contains(s.params.optionActiveClass)) {
          var key = n.getAttribute('data-id')
          var value = n.getAttribute('data-name')
          s.activeOptions.push({
            id: key,
            name: value
          })
        }
      })
      // 单选
    } else {
      // 重置选中项
      options.forEach(function (n, i) {
        n.classList.remove(s.params.optionActiveClass)
      })
      // 设置点中的为选中项
      e.target.classList.add(s.params.optionActiveClass)
      var id = e.target.getAttribute('data-id')
      var name = e.target.getAttribute('data-name')
      s.activeOptions = [
        {
          id: id,
          name: name
        }
      ]
    }

    // Callback
    if (s.params.onClickOption) s.params.onClickOption(s)
  }
  // Submit|Cancel
  s.onClickSubmit = function (s) {
    if (s.params.onClickSubmit) s.params.onClickSubmit(s)
    else s.hide()
  }
  s.onClickCancel = function (s) {
    if (s.params.onClickCancel) s.params.onClickCancel(s)
    else s.hide()
  }

  s.onTransitionEnd = function (e) {
    var target = e.target
    if (e.propertyName !== 'transform' || target !== s.picker) {
      return
    }
    // 容器显隐
    if (target.classList.contains(s.params.pickerClass)) {
      if (s.params.onTransitionEnd) s.params.onTransitionEnd(s)
      if (s.isHid) {
        if (s.params.onHid) s.params.onHid(s)
      } else {
        if (s.params.onShowed) s.params.onShowed(s)
      }
    }
  }

  s.init = function () {
    if (s.params.onInit) s.params.onInit(s)
    s.attach()
  }
  s.init()
  return s
}

export default PickerSelect
