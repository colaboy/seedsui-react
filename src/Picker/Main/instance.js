// Picker 滚动选择器
let Picker = function (params) {
  /* ------------------------
  Model
  ------------------------ */
  let defaults = {
    fieldNames: {
      id: 'id',
      name: 'name'
    },

    wrapperClass: 'picker-wrapper',

    slotboxClass: 'picker-slotbox',
    slotClass: 'picker-slot',

    layerClass: 'picker-layer',
    layerFrameClass: 'picker-layer-frame',
    layerFrameHTML: '<div class=picker-layer-frame></div>',

    lockClass: 'lock',

    cellHeight: 44,
    bounceRange: 44 // 弹性值

    /* callbacks
    onInit:function (Picker)
    onScrollStart:function (Picker)
    onScroll:function (Picker)
    onScrollEnd:function (Picker)
    onScrollTransitionEnd: function (Picker)
    onTransitionEnd:function (Picker)// 动画结束后回调
    */
  }
  // eslint-disable-next-line
  params = params || {}
  for (let def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  // Picker
  let s = this

  // Params
  s.params = params
  // Dom元素
  s.wrapper =
    typeof s.params.wrapper === 'string'
      ? document.querySelector(s.params.wrapper)
      : s.params.wrapper
  if (!s.wrapper) {
    console.log('SeedsUI Error：未找到Picker的wrapper元素，请检查传入参数是否正确')
    return
  }
  s.slotbox = null
  s.layer = null
  s.headerSubmit = null
  s.headerCancel = null

  // 选中项
  s.activeOptions = []

  // 新建Slotbox
  s.createSlotbox = function () {
    let slotbox = document.createElement('div')
    slotbox.setAttribute('class', s.params.slotboxClass)
    return slotbox
  }

  // 新建Layer
  s.createLayer = function () {
    let layer = document.createElement('div')
    layer.setAttribute('class', s.params.layerClass)
    layer.innerHTML = s.params.layerFrameHTML
    return layer
  }

  // 创建DOM
  s.update = function () {
    if (s.params.wrapper) {
      s.wrapper =
        typeof s.params.wrapper === 'string'
          ? document.querySelector(s.params.wrapper)
          : s.params.wrapper
    }

    if (s.wrapper && s.wrapper.tagName) {
      s.header = s.wrapper.querySelector('.' + s.params.headerClass)
      s.slotbox = s.wrapper.querySelector('.' + s.params.slotboxClass)
      s.layer = s.wrapper.querySelector('.' + s.params.layerClass)
    } else {
      s.slotbox = s.createSlotbox()
      s.layer = s.createLayer()

      s.wrapper.appendChild(s.layer)
      s.wrapper.appendChild(s.slotbox)
    }
    // 兼容安卓部分机型touch事件不工作的问题
    let androidExp = navigator.userAgent.toLowerCase().match(/android\s*(\d*\.*\d*)/)
    if (androidExp && androidExp[1]) {
      if (androidExp[1] < '5.0') s.wrapper.setAttribute('onTouchStart', '')
    }
  }
  s.update()
  // 更新params
  s.updateParams = function (params = {}) {
    for (let param in params) {
      s.params[param] = params[param]
    }
    // 更新DOM
    s.update()
  }
  /* ------------------------
  Method
  ------------------------ */
  // 添加一列
  s.addSlot = function (values, defaultKey, classes) {
    // eslint-disable-next-line
    if (!classes) classes = ''
    // 设置属性
    let slot = document.createElement('ul')
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
    // eslint-disable-next-line
    if (!classes) classes = ''
    // 设置属性
    let slot = s.slotbox.children[index]
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

  s.renderSlot = function (slot) {
    // 渲染一列
    let index = slot.index
    let values = slot.values
    slot.innerHTML = ''
    // 渲染
    let li = ''
    let defaultIndex = 0
    for (let i = 0; i < values.length; i++) {
      // 获得defaultIndex
      // eslint-disable-next-line
      if (slot.defaultKey && slot.defaultKey == values[i][s.params.fieldNames.id || 'id']) {
        defaultIndex = i
      }

      // 把li添加到槽中
      li += '<li>' + values[i][s.params.fieldNames.name || 'name'] + '</li>'
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
  s.clearSlots = function () {
    // 清除
    // 清空数据
    s.slotbox.innerHTML = ''
  }
  // 计算惯性时间与坐标，返回距离和时间
  s.calcInertance = function (opts) {
    // 摩擦力
    let friction = 0.002
    // 滑动距离
    let opRange = opts.range
    // 滑动时长
    let opDuration = opts.duration

    // 使用公式算出duration(新时长)
    let duration = (2 * opRange) / opDuration / friction
    // 使用公式算出offset(新距离)
    let range = -(friction / 2) * (duration * duration)
    if (opRange < 0) {
      // 如果拖动间距为负值，则为向下拖动
      duration = -duration
      range = -range
    }
    /* console.log('滑动距离:' + opRange)
    console.log('滑动时长:' + opDuration)
    console.log('新时长:' + duration)
    console.log('新距离:' + range) */
    // 使用距离计算新的位置
    let value = opts.current + range

    // 矫正位置与时长
    if (value > opts.min) {
      // 最上面
      // Math.abs(Math.round(value)) - Math.abs(Math.round(opts.min))
      duration = 300
      value = opts.min
    } else if (value < opts.max) {
      // 最下面
      duration = 300
      value = opts.max
    } else {
      // 在中间
      let remainder = value % s.params.cellHeight
      if (remainder !== 0) {
        // 算出比例
        let divided = Math.round(value / s.params.cellHeight)
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
    let index = -Math.round((posY - s.params.cellHeight * 2) / s.params.cellHeight) - 2
    // 添加到激活项
    let activeOption = slot.values[index]
    s.activeOptions[slot.index] = activeOption
  }
  /* ------------------------
  Events
  ------------------------ */
  s.isSupportTouch = 'ontouchstart' in window
  s.events = function (detach) {
    let action = detach ? 'removeEventListener' : 'addEventListener'
    // touch兼容pc事件
    if (s.isSupportTouch) {
      s.slotbox[action]('touchstart', s.onTouchStart, false)
      s.slotbox[action]('touchmove', s.onTouchMove, false)
      s.slotbox[action]('touchend', s.onTouchEnd, false)
      s.slotbox[action]('touchcancel', s.onTouchEnd, false)
    } else {
      s.slotbox[action]('mousedown', s.onTouchStart, false)
      s.slotbox[action]('mousemove', s.onTouchMove, false)
      s.slotbox[action]('mouseup', s.onTouchEnd, false)
    }
    // 选择器事件
    s.wrapper[action]('webkitTransitionEnd', s.onTransitionEnd, false)
  }
  s.detach = function (event) {
    s.events(true)
  }
  s.attach = function (event) {
    s.events()
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
  s.startMouseMove = false
  // 触摸事件
  s.onTouchStart = function (e) {
    s.startMouseMove = true
    s.touches.startX = e.clientX || e.touches[0].clientX
    s.touches.startY = e.clientY || e.touches[0].clientY
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
    if (!s.startMouseMove) return
    e.preventDefault()
    // 锁定的槽将不工作
    if (s.activeSlot.isLock) return

    s.touches.currentY = e.clientY || e.touches[0].clientY
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
    s.startMouseMove = false
    // 锁定的槽将不工作
    if (s.activeSlot.isLock) return

    s.touches.endX = e.clientX || e.changedTouches[0].clientX
    s.touches.endY = e.clientY || e.changedTouches[0].clientY
    s.touches.diffX = s.touches.startX - s.touches.endX
    s.touches.diffY = s.touches.startY - s.touches.endY
    // 判断是否是tap
    if (Math.abs(s.touches.diffX) < 6 && Math.abs(s.touches.diffY) < 6) {
      return
    }

    // 计算拖动时间
    s.touches.duration = e.timeStamp - s.touches.startTimeStamp

    // 惯性值计算
    let inertance = s.calcInertance({
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
    if (inertance.duration) {
      setTimeout(() => {
        if (s.params.onScrollTransitionEnd) s.params.onScrollTransitionEnd(s)
      }, Number(inertance.duration || 0) + 50)
    }

    if (s.params.onScrollEnd) s.params.onScrollEnd(s)
  }

  s.onTransitionEnd = function (e) {
    let target = e.target
    if (e.propertyName !== 'transform' || target !== s.wrapper) {
      return
    }
    // 容器显隐
    if (target.classList.contains(s.params.wrapperClass)) {
      if (s.params.onTransitionEnd) s.params.onTransitionEnd(s)
    }
  }

  s.init = function () {
    if (s.params.onInit) s.params.onInit(s)
    s.attach()
  }
  s.init()
  return s
}

export default Picker
