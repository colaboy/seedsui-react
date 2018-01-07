// Picker 滚动选择器
var Picker = function (params) {
  /* ------------------------
  Model
  ------------------------ */
  var defaults = {
    overflowContainer: document.body,
    overflowContainerActiveClass: 'overflow-hidden',

    mask: null,

    maskClass: 'mask',
    maskActiveClass: 'active',
    maskFeatureClass: 'picker-mask',

    pickerClass: 'picker',
    pickerActiveClass: 'active',

    headerClass: 'picker-header',
    headerSubmitClass: 'picker-submit',
    headerSubmitText: '完成',
    headerCancelClass: 'picker-cancel',
    headerCancelText: '取消',

    wrapperClass: 'picker-wrapper',

    slotboxClass: 'picker-slotbox',
    slotClass: 'picker-slot',

    layerClass: 'picker-layer',
    layerFrameClass: 'picker-layer-frame',
    layerFrameHTML: '<div class=picker-layer-frame></div>',

    lockClass: 'lock',

    cellHeight: 44,
    bounceRange: 44, // 弹性值

    /* callbacks
    onInit:function (Picker)
    onClickCancel:function (Picker)
    onClickSubmit:function (Picker)
    onClickMask:functioin (Picker)
    onScrollStart:function (Picker)
    onScroll:function (Picker)
    onScrollEnd:function (Picker)
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
  s.overflowContainer = typeof s.params.overflowContainer === 'string' ? document.querySelector(s.params.overflowContainer) : s.params.overflowContainer
  s.picker = null
  s.mask = null
  s.header = null
  s.wrapper = null
  s.slotbox = null
  s.layer = null
  s.headerSubmit = null
  s.headerCancel = null

  // 选中项
  s.activeOptions = []
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

  // 新建Slotbox
  s.createSlotbox = function () {
    var slotbox = document.createElement('div')
    slotbox.setAttribute('class', s.params.slotboxClass)
    return slotbox
  }

  // 新建Layer
  s.createLayer = function () {
    var layer = document.createElement('div')
    layer.setAttribute('class', s.params.layerClass)
    layer.innerHTML = s.params.layerFrameHTML
    return layer
  }

  // 新建Mask
  s.createMask = function () {
    var mask = document.createElement('div')
    mask.setAttribute('class', s.params.maskClass + ' ' + s.params.maskFeatureClass)
    return mask
  }

  // 创建DOM
  s.create = function () {
    if (s.params.mask) s.mask = typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask

    if (s.mask) {
      s.picker = s.mask.querySelector('.' + s.params.pickerClass)
      s.header = s.mask.querySelector('.' + s.params.headerClass)
      s.headerSubmit = s.mask.querySelector('.' + s.params.headerSubmitClass)
      s.headerCancel = s.mask.querySelector('.' + s.params.headerCancelClass)
      s.wrapper = s.mask.querySelector('.' + s.params.wrapperClass)
      s.slotbox = s.mask.querySelector('.' + s.params.slotboxClass)
      s.layer = s.mask.querySelector('.' + s.params.layerClass)
      return
    }
    s.mask = s.createMask()
    s.picker = s.createPicker()
    s.header = s.createHeader()
    s.headerSubmit = s.createHeaderSubmit()
    s.headerCancel = s.createHeaderCancel()
    s.wrapper = s.createWrapper()
    s.slotbox = s.createSlotbox()
    s.layer = s.createLayer()

    s.header.appendChild(s.headerCancel)
    s.header.appendChild(s.headerSubmit)

    s.wrapper.appendChild(s.layer)
    s.wrapper.appendChild(s.slotbox)

    s.picker.appendChild(s.header)
    s.picker.appendChild(s.wrapper)

    s.mask.appendChild(s.picker)
    s.overflowContainer.appendChild(s.mask)
  }
  s.create()
  /* ------------------------
  Method
  ------------------------ */
  // 添加一列
  s.addSlot = function (values, defaultKey, classes) {
    if (!classes) classes = ''
    // 设置属性
    var slot = document.createElement('ul')
    slot.setAttribute('class', s.params.slotClass + ' ' + classes)
    slot.values = values
    slot.defaultKey = defaultKey
    if (classes.indexOf(s.params.lockClass) >= 0) slot.isLock = true
    else slot.isLock = false

    // 添加到集合里
    s.slotbox.appendChild(slot)

    // 渲染
    slot.index = s.slotbox.children.length - 1
    s.renderSlot(slot)
  }
  // 替换一列
  s.replaceSlot = function (index, values, defaultKey, classes, fn) {
    if (!classes) classes = ''
    // 设置属性
    var slot = s.slotbox.children[index]
    slot.setAttribute('class', s.params.slotClass + ' ' + classes)
    slot.values = values
    slot.defaultKey = defaultKey
    if (classes.indexOf(s.params.lockClass) >= 0) slot.isLock = true
    else slot.isLock = false

    if (classes.indexOf(s.params.lockClass) >= 0) s.slotbox.children[index].isLock = true
    else s.slotbox.children[index].isLock = false
    // 渲染
    s.renderSlot(slot)
    // 回调
    if (fn) fn(s)
  }

  s.renderSlot = function (slot) { // 渲染一列
    var index = slot.index
    var values = slot.values
    slot.innerHTML = ''
    // 渲染
    var li = ''
    var defaultIndex = 0
    for (var i = 0; i < values.length; i++) {
      // 获得defaultIndex
      if (slot.defaultKey && slot.defaultKey === values[i]['key']) {
        defaultIndex = i
      }

      // 把li添加到槽中
      li += '<li>' + values[i]['value'] + '</li>'
    }
    slot.innerHTML = li
    // 选中项
    s.activeOptions[index] = slot.values[defaultIndex]
    // 设置一槽的属性
    /*
    slot.values
    slot.defaultKey
    slot.index
    */
    slot.defaultPosY = -defaultIndex * s.params.cellHeight
    slot.posY = -defaultIndex * s.params.cellHeight
    slot.minPosY = 0
    slot.maxPosY = -(slot.values.length - 1) * s.params.cellHeight
    slot.minBouncePosY = s.params.bounceRange
    slot.maxBouncePosY = slot.maxPosY - s.params.bounceRange

    slot.style.webkitTransform = 'translate(0px,' + slot.posY + 'px)'
  }
  s.isHid = true
  // 隐藏
  s.hide = function () {
    s.isHid = true
    s.mask.classList.remove(s.params.maskActiveClass)
    s.picker.classList.remove(s.params.pickerActiveClass)
    // 显示滚动条
    if (s.overflowContainer) s.overflowContainer.classList.remove(s.params.overflowContainerActiveClass)
  }
  s.show = function () { // 显示
    s.isHid = false
    s.mask.classList.add(s.params.maskActiveClass)
    s.picker.classList.add(s.params.pickerActiveClass)
    // 禁用滚动条
    if (s.overflowContainer) s.overflowContainer.classList.add(s.params.overflowContainerActiveClass)
  }
  s.clearSlots = function () { // 清除
    // 清空数据
    s.slotbox.innerHTML = ''
  }
  s.destroy = function () { // 销毁
    s.overflowContainer.removeChild(s.mask)
  }
  // 计算惯性时间与坐标，返回距离和时间
  s.calcInertance = function (opts) {
    // 摩擦力
    var friction = 0.002
    // 滑动距离
    var opRange = opts.range
    // 滑动时长
    var opDuration = opts.duration

    // 使用公式算出duration(新时长)
    var duration = (2 * opRange / opDuration) / friction
    // 使用公式算出offset(新距离)
    var range = -(friction / 2) * (duration * duration)
    if (opRange < 0) { // 如果拖动间距为负值，则为向下拖动
      duration = -duration
      range = -range
    }
    /* console.log('滑动距离:' + opRange)
    console.log('滑动时长:' + opDuration)
    console.log('新时长:' + duration)
    console.log('新距离:' + range) */
    // 使用距离计算新的位置
    var value = opts.current + range

    // 矫正位置与时长
    if (value > opts.min) { // 最上面
      // Math.abs(Math.round(value)) - Math.abs(Math.round(opts.min))
      duration = 300
      value = opts.min
    } else if (value < opts.max) { // 最下面
      duration = 300
      value = opts.max
    } else { // 在中间
      var remainder = value % s.params.cellHeight
      if (remainder !== 0) {
        // 算出比例
        var divided = Math.round(value / s.params.cellHeight)
        // 对准位置
        value = s.params.cellHeight * divided
      }
    }

    // 更新选中项
    s.updateActiveOptions(s.activeSlot, value)

    // 返回值
    return {
      duration: Math.round(duration),
      value: Math.round(value)
    }
  }
  // 更新列表激活状态
  s.updateActiveOptions = function (slot, posY) {
    var index = -Math.round((posY - s.params.cellHeight * 2) / s.params.cellHeight) - 2
    // 添加到激活项
    var activeOption = slot.values[index]
    s.activeOptions[slot.index] = activeOption
  }
  /* ------------------------
  Control
  ------------------------ */
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    // 滑动事件
    s.slotbox[action]('touchstart', s.onTouchStart, false)
    s.slotbox[action]('touchmove', s.onTouchMove, false)
    s.slotbox[action]('touchend', s.onTouchEnd, false)
    s.slotbox[action]('touchcancel', s.onTouchEnd, false)
    // 选择器事件
    s.picker[action]('webkitTransitionEnd', s.onTransitionEnd, false)
    // 遮罩
    // s.mask[action]('touchmove', s.preventDefault, false)
    s.mask[action]('click', s.onClickMask, false)
    // 按钮
    // s.header[action]('touchmove', s.preventDefault, false)
    s.headerSubmit[action]('click', s.onClickSubmit, false)
    s.headerCancel[action]('click', s.onClickCancel, false)
  }
  s.detach = function (event) {
    s.events(true)
  }
  s.attach = function (event) {
    s.events()
  }

  s.preventDefault = function (e) {
    e.preventDefault()
  }

  // Mask
  s.onClickMask = function (e) {
    if (e.target !== s.mask) return
    if (s.params.onClickMask) s.params.onClickMask(e)
    else s.hide()
  }

  // Submit|Cancel
  s.onClickSubmit = function (e) {
    s.target = e.target
    s.params.onClickSubmit(s)
  }
  s.onClickCancel = function (e) {
    s.target = e.target
    if (s.params.onClickCancel) s.params.onClickCancel(s)
    else s.hide()
  }

  s.touches = {
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    endX: 0,
    endY: 0,
    startTimeStamp: 0,
    duration: 0,
    diffX: 0,
    diffY: 0,
    posY: 0,
    currentPosY: 0,
    direction: null
  }

  // 触摸事件
  s.onTouchStart = function (e) {
    s.touches.startX = e.touches[0].clientX
    s.touches.startY = e.touches[0].clientY
    // 寻找当前点击的槽
    s.activeSlot = e.target

    // 锁定的槽将不工作
    if (s.activeSlot.isLock) return

    // 获得位置
    s.touches.posY = s.activeSlot.posY

    // 清除动画
    s.activeSlot.style.webkitTransitionDuration = 0

    // 记录点击时间
    s.touches.startTimeStamp = e.timeStamp
    // Callback
    if (s.params.onScrollStart) s.params.onScrollStart(s)
  }
  s.onTouchMove = function (e) {
    e.preventDefault()
    // 锁定的槽将不工作
    if (s.activeSlot.isLock) return

    s.touches.currentY = e.touches[0].clientY
    s.touches.diffY = s.touches.startY - s.touches.currentY
    s.touches.currentPosY = s.touches.posY - s.touches.diffY
    if (s.touches.currentPosY > s.activeSlot.minBouncePosY) {
      s.touches.currentPosY = s.activeSlot.minBouncePosY
    } else if (s.touches.currentPosY < s.activeSlot.maxBouncePosY) {
      s.touches.currentPosY = s.activeSlot.maxBouncePosY
    }
    s.activeSlot.style.webkitTransform = 'translate(0px,' + s.touches.currentPosY + 'px)'

    // Callback
    if (s.params.onScroll) s.params.onScroll(s)
  }
  s.onTouchEnd = function (e) {
    // 锁定的槽将不工作
    if (s.activeSlot.isLock) return

    s.touches.endX = e.changedTouches[0].clientX
    s.touches.endY = e.changedTouches[0].clientY
    s.touches.diffX = s.touches.startX - s.touches.endX
    s.touches.diffY = s.touches.startY - s.touches.endY
    // 判断是否是tap
    if (Math.abs(s.touches.diffX) < 6 && Math.abs(s.touches.diffY) < 6) {
      return
    }

    // 计算拖动时间
    s.touches.duration = e.timeStamp - s.touches.startTimeStamp

    // 惯性值计算
    var inertance = s.calcInertance({
      range: s.touches.diffY,
      duration: s.touches.duration,
      current: s.touches.currentPosY,
      min: s.activeSlot.minPosY,
      max: s.activeSlot.maxPosY
    })
    // 滚动到指定位置
    s.activeSlot.style.webkitTransitionDuration = inertance.duration + 'ms'
    s.activeSlot.posY = inertance.value
    s.activeSlot.style.webkitTransform = 'translate(0px,' + inertance.value + 'px)'

    // Callback onScrollEnd
    if (s.params.onScrollEnd) s.params.onScrollEnd(s)
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

;//export default Picker
